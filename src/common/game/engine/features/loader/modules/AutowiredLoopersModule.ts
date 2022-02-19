// import { GameEngineConfigurer } from "./api/GameEngineConfigurer";

import { ApplicationContainer } from "../../../../../app/ApplicationContainer";
import { GameLooper, TYPE_GameLooper } from "../../../core/GameLooper";
import { GameEngine } from "../../../GameEngine";
import { BaseGameLoaderModule } from "../BaseGameLoaderModule";
import { LoadGameObject } from "../object/LoadGameObject";

export class AutowiredLoopersModule extends BaseGameLoaderModule {
  loopers!: Array<GameLooper>;
  gameEngine!: GameEngine;

  autowire(application: ApplicationContainer) {
    this.gameEngine = application.getComponent(GameEngine);
    this.loopers = application.getComponentList(TYPE_GameLooper);
  }

  startNewGame(loadGameObject: LoadGameObject): void {
    this.gameEngine.clearLoopers();
    this.loopers.forEach((x) => this.gameEngine.registerLooper(x));
  }
}
