import { Promise } from "bluebird";
import { Application } from "../../app/Application";
import { Introspection } from "../../app/lookup/Introspection";
import { GameLoop } from "./looper/GameLoop";
import { GameEvent } from "./GameEvent";
import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../app/api/ApplicationComponent";
import { GameViewCollection } from "./ui/view/GameViewsCollection";

export class GameEngine implements ApplicationComponent {
  private controllers: Array<GameLoop> = [];
  private application!: Application;
  private gameViewCollection!: GameViewCollection;

  private lastTimeMills!: number;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
    this.application = application;
    this.gameViewCollection = application.getComponent(GameViewCollection);
  }

  __gameLoop() {
    this.__playNext();

    requestAnimationFrame(this.__gameLoop.bind(this));
  }

  __playNext() {
    const gameEvent = new GameEvent();

    const currentTimeMills = new Date().getTime();
    gameEvent.elapsedTimeMills = currentTimeMills - this.lastTimeMills;
    this.lastTimeMills = currentTimeMills;

    gameEvent.application = this.application;

    for(const view of this.gameViewCollection.list) {
      for(const loop of view.processingLoops) {
        try {
          loop.execute(view, gameEvent)
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

    for(const view of this.gameViewCollection.list) {
      for(const loop of view.renderingLoops) {
        try {
          loop.execute(view, gameEvent)
        } catch (ex) {
          console.error("Game Engine", ex);
        }
      }
    }
  }

  registerLooper(controller: GameLoop) {
    this.controllers.push(controller);
  }

  async startGameEngine() {
    await Promise.all(
      this.controllers.map((x) => x.start && x.start(this.application))
    );

    await this.gameViewCollection.startGameEngine()

    this.lastTimeMills = new Date().getTime() - 1;

    this.__gameLoop();
  }
}
