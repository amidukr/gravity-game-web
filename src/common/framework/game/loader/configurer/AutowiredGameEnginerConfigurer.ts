// import { GameEngineConfigurer } from "./api/GameEngineConfigurer";

import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../../app/api/ApplicationComponent";
import { Application } from "../../../../app/Application";
import { Introspection } from "../../../../app/lookup/Introspection";
import { GameEngine } from "../../GameEngine";
import { GameLoop, TYPE_GameLooper } from "../../looper/GameLoop";
import { GameEngineConfigurer, TYPE_GameEngineConfigurer } from "./GameEngineConfigurer";

export class AutowiredGameEngineConfigurer implements ApplicationComponent, GameEngineConfigurer {
  private loopers!: Array<GameLoop>;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameEngineConfigurer);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
    this.loopers = application.getComponentList(TYPE_GameLooper);
  }

  configure(gameEngine: GameEngine): void {
    this.loopers.forEach((x) => gameEngine.registerLooper(x));
  }
}
