import { Promise } from "bluebird";
import Stats from "stats.js";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../../app/api/ApplicationComponent";
import { Application } from "../../app/Application";
import { Introspection } from "../../app/lookup/Introspection";
import { GameEvent } from "./GameEvent";
import { GameLoop } from "./looper/GameLoop";
import { GameViewCollection } from "./ui/view/GameViewsCollection";

export class GameEngine implements ApplicationComponent {
  private controllers: Array<GameLoop> = [];
  private application!: Application;
  private gameViewCollection!: GameViewCollection;
  private stats = new Stats();

  private lastTimeMills!: number;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
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

    //window.setTimeout(this.__gameLoop.bind(this), 0)

    requestAnimationFrame(this.__gameLoop.bind(this));
  }

  __playNext() {
    const gameEvent = new GameEvent();

    const currentTimeMills = new Date().getTime();
    gameEvent.elapsedTimeMills = currentTimeMills - this.lastTimeMills;
    this.lastTimeMills = currentTimeMills;

    gameEvent.application = this.application;

    for (const view of this.gameViewCollection.list) {
      for (const loop of view.processingLoops) {
        try {
          loop.execute(gameEvent, view);
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
      for (const loop of view.renderingLoops) {
        try {
          loop.execute(gameEvent, view);
        } catch (ex) {
          console.error("Game Engine", ex);
        }
      }
    }
  }

  registerLooper(controller: GameLoop) {
    this.controllers.push(controller);
  }

  async startNewGame() {
    await Promise.all(this.controllers.map((x) => x.startNewGame && x.startNewGame(this.application)));

    await this.gameViewCollection.startNewGame();

    this.lastTimeMills = new Date().getTime() - 1;

    this.__gameLoop();
  }
}
