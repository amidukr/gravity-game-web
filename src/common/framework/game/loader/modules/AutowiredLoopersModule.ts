// import { GameEngineConfigurer } from "./api/GameEngineConfigurer";

import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { Introspection } from "../../../../app/lookup/Introspection";
import { GameEngine } from "../../GameEngine";
import { GameLoop, TYPE_GameLooper } from "../../looper/GameLoop";
import { GameLoaderModule, TYPE_GameLoaderModule } from "../GameLoaderModule";
import { LoadGameObject } from "../object/LoadGameObject";

export class AutowiredLoopersModule implements ApplicationComponent, GameLoaderModule {
  loopers!: Array<GameLoop>;
  gameEngine!: GameEngine;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoaderModule);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: ApplicationContainer) {
    this.gameEngine = application.getComponent(GameEngine);
    this.loopers = application.getComponentList(TYPE_GameLooper);
  }

  startNewGame(loadGameObject: LoadGameObject): void {
    this.gameEngine.clearLoopers();
    this.loopers.forEach((x) => this.gameEngine.registerLooper(x));
  }
}
