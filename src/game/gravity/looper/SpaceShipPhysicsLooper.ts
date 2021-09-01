import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import {
  GameLooper,
  TYPE_GameLooper,
} from "../../../common/framework/game/looper/GameLooper";

export class SpaceShipPhysicsLooper implements GameLooper {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName<GameLooper>(
      this,
      TYPE_GameLooper
    );
  }

  run() {}
}
