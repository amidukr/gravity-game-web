import { Promise } from "bluebird";
import Stats from "stats.js";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../app/ApplicationContainer";
import { Introspection } from "../../app/lookup/Introspection";
import { GameEvent } from "./GameEvent";
import { GameLoop, TYPE_GameProcessingViewLoop, TYPE_GameRenderingViewLoop } from "./looper/GameLoop";
import { TYPE_GameLoopStarter } from "./looper/GameLoopStarter";
import { GameViewCollection } from "./ui/view/GameViewsCollection";

export class GameEngine implements ApplicationComponent {
  private controllers: Array<GameLoop> = [];
  private application!: ApplicationContainer;
  private gameViewCollection!: GameViewCollection;
  private stats = new Stats();

  private lastTimeMills!: number;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: ApplicationContainer) {
    this.application = application;
    this.gameViewCollection = application.getComponent(GameViewCollection);
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

    for (const view of this.gameViewCollection.list) {
      const processingLoops = view.container.getComponentList(TYPE_GameProcessingViewLoop);
      for (const loop of processingLoops) {
        try {
          loop.execute(gameEvent);
        } catch (ex) {
          console.error("Game Engine", ex);
        }
      }
    }

    this.controllers.forEach((controller) => {
      try {
        controller.execute(gameEvent);
      } catch (ex) {
        console.error("Game Engine", ex);
      }
    });

    for (const view of this.gameViewCollection.list) {
      const renderingLoops = view.container.getComponentList(TYPE_GameRenderingViewLoop);
      for (const loop of renderingLoops) {
        try {
          loop.execute(gameEvent);
        } catch (ex) {
          console.error("Game Engine", ex);
        }
      }
    }
  }

  clearLoopers() {
    this.controllers = [];
  }

  registerLooper(controller: GameLoop) {
    this.controllers.push(controller);
  }

  async startNewGame() {
    const starters = this.application.getComponentList(TYPE_GameLoopStarter);

    await Promise.all(starters.map((x) => x.startNewGame()));

    await this.gameViewCollection.startNewGame();

    this.lastTimeMills = new Date().getTime() - 1;

    this.__gameLoop();
  }
}
