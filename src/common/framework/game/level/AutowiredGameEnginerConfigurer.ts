// import { GameEngineConfigurer } from "./api/GameEngineConfigurer";

import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../app/api/ApplicationComponent";
import { Application } from "../../../app/Application";
import { ApplicationComponentMeta } from "../../../app/lookup/ApplicationComponentMeta";
import { GameEngine } from "../GameEngine";
import { GameLooper, TYPE_GameLooper } from "../looper/GameLooper";
import {
  GameEngineConfigurer,
  TYPE_GameEngineConfigurer,
} from "./api/GameEngineConfigurer";

export class AutowiredGameEngineConfigurer
  implements ApplicationComponent, GameEngineConfigurer
{
  private loopers!: Array<GameLooper>;

  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_GameEngineConfigurer);
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
    this.loopers = application.getComponentList(TYPE_GameLooper);
  }

  configure(gameEngine: GameEngine): void {
    this.loopers.forEach((x) => gameEngine.registerLooper(x));
  }
}
