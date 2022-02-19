// import { GameEngineConfigurer } from "./api/GameEngineConfigurer";

import { ApplicationContainer } from "../../../../../app/ApplicationContainer";
import { GameEngine } from "../../../GameEngine";
import { GameLooper, TYPE_GameLoop } from "../../../lifecycle/GameLooper";
import { BaseGameLoaderModule } from "../BaseGameLoaderModule";
import { LoadGameObject } from "../object/LoadGameObject";

export class AutowiredLoopersModule extends BaseGameLoaderModule {
  loopers!: Array<GameLooper>;
  gameEngine!: GameEngine;

  autowire(application: ApplicationContainer) {
    this.gameEngine = application.getComponent(GameEngine);
    this.loopers = application.getComponentList(TYPE_GameLoop);
  }

  startNewGame(loadGameObject: LoadGameObject): void {
    this.gameEngine.clearLoopers();
    this.loopers.forEach((x) => this.gameEngine.registerLooper(x));
  }
}
