import { Promise } from "bluebird";
import { Application } from "../../app/Application";
import { ApplicationComponentMeta } from "../../app/lookup/ApplicationComponentMeta";
import { GameLooper } from "./looper/GameLooper";
import { GameEvent } from "./GameEvent";

export class GameEngine {
  private controllers: Array<GameLooper> = [];
  private application!: Application;

  constructor() {
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  autowire(application: Application) {
    this.application = application;
  }

  __gameLoop() {
    this.__playNext();

    requestAnimationFrame(this.__gameLoop.bind(this));
  }

  __playNext() {
    const gameEvent = new GameEvent();

    gameEvent.application = this.application;

    this.controllers.forEach((controller) => {
      try {
        controller.run(gameEvent);
      } catch (ex) {
        console.error("Game Engine", ex);
      }
    });
  }

  registerLooper(controller: GameLooper) {
    this.controllers.push(controller);
  }

  start() {
    Promise.all(
      this.controllers.map((x) => x.start && x.start(this.application))
    );

    this.__gameLoop();
  }
}
