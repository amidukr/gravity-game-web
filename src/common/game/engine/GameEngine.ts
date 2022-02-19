import Stats from "stats.js";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../app/ApplicationContainer";
import { Introspection } from "../../app/lookup/Introspection";
import { GameLoader, TYPE_GameStarter } from "./core/GameLoader";
import { GameLooper, TYPE_GameLooper } from "./core/GameLooper";
import { LoadGameArgumentsModel, LoadGameArgumentsObject } from "./features/loader/LoadGameArgumentsModel";
import { GameEvent } from "./GameEvent";
import { GameViewCollection } from "./ui/view/GameViewsCollection";

export class GameEngine implements ApplicationComponent {
  private application!: ApplicationContainer;
  private stats = new Stats();

  private gameViewCollection!: GameViewCollection;
  private lastTimeMills!: number;
  loadGameModel!: LoadGameArgumentsModel;
  loopers!: GameLooper[];
  starters!: GameLoader[];

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: ApplicationContainer) {
    this.application = application;
    this.gameViewCollection = application.getComponent(GameViewCollection);

    this.loadGameModel = application.getComponent(LoadGameArgumentsModel);

    this.starters = application.getComponentList(TYPE_GameStarter);
    this.loopers = application.getComponentList(TYPE_GameLooper);
  }

  start() {
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
  }

  __gameLoop() {
    for (var i = 0; i < 1; i++) {
      this.stats.begin();

      this.__playNext();

      this.stats.end();
    }

    requestAnimationFrame(this.__gameLoop.bind(this));
  }

  __playNext() {
    const gameEvent = new GameEvent();

    const currentTimeMills = new Date().getTime();
    gameEvent.elapsedTimeMills = currentTimeMills - this.lastTimeMills;
    this.lastTimeMills = currentTimeMills;

    gameEvent.application = this.application;

    this.loopers.forEach((looper) => {
      try {
        looper.execute(gameEvent);
      } catch (ex) {
        console.error("Game Engine", ex);
      }
    });

    for (const view of this.gameViewCollection.list) {
      const processingLoops = view.container.getComponentList(TYPE_GameLooper);
      for (const loop of processingLoops) {
        try {
          loop.execute(gameEvent);
        } catch (ex) {
          console.error("Game Engine", ex);
        }
      }
    }
  }

  async startNewGame(argumetns: LoadGameArgumentsObject) {
    this.loadGameModel.object = argumetns;

    for (const starter of this.starters) {
      try {
        await starter.startNewGame();
      } catch (ex) {
        console.error("Game Engine", ex);
      }
    }

    await this.gameViewCollection.startNewGame();

    this.lastTimeMills = new Date().getTime() - 1;

    this.__gameLoop();
  }
}
