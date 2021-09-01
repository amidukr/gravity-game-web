import { Application } from "../../../common/app/Application";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GameEngine } from "../../../common/framework/game/GameEngine";
import {
  GameEngineConfigurer,
  TYPE_GameEngineConfigurer,
} from "../../../common/framework/game/level/api/GameEngineConfigurer";
import { GravityRenderingLooper } from "../looper/GravityRenderingLooper";
import { SpaceShipPhysicsLooper } from "../looper/SpaceShipPhysicsLooper";

export class GravityGameEngineConfigurer implements GameEngineConfigurer {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_GameEngineConfigurer);
  }

  configure(gameEngine: GameEngine): void {
    gameEngine.registerLooper(new GravityRenderingLooper());
    gameEngine.registerLooper(new SpaceShipPhysicsLooper());
  }
}
