import { Introspection } from "../../../common/app/lookup/Introspection";
import {
  GameLoop,
  TYPE_GameLooper,
} from "../../../common/framework/game/looper/GameLoop";

export class SpaceShipPhysicsLoop implements GameLoop {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLooper);
  }

  execute() {}
}
