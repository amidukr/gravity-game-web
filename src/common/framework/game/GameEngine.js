import { Application } from "../../app/Application";
import { ApplicationComponentMeta } from "../../app/lookup/ApplicationComponentMeta";
import { GameEvent } from "./GameEvent";

export class GameEngine {
  controllers = [];

  constructor() {
    const self = this;

    ApplicationComponentMeta.registerGlobalFunction(
      this,
      function autowireApplicationComponent(application) {
        self.application = application.getComponentByType(Application);
      }
    );
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
        controller.execute(gameEvent);
      } catch (ex) {
        console.error("Game Engine", ex);
      }
    });
  }

  registerController(controller) {
    this.controllers.push(controller);
  }

  start() {
    this.__gameLoop();
  }
}
