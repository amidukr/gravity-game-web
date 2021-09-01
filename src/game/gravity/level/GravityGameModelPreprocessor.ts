import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GameLevel } from "../../../common/framework/game/level/api/GameLevelRepository";
import {
  GameModelPreprocessor,
  TYPE_GameModelPreprocessor,
} from "../../../common/framework/game/level/api/GameModelPreprocessor";
import { GameModel } from "../../../common/framework/game/model/GameModel";
import * as THREE from "three";

export class GravityGameModelPreprocessor implements GameModelPreprocessor {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(
      this,
      TYPE_GameModelPreprocessor
    );
  }

  preprocess(gameModel: GameModel, gameLevel: GameLevel): void {
    const persistentShared = gameModel.persistentShared;

    const playerSpaceShip = persistentShared.spaceShips.player;

    playerSpaceShip.quaternion = new THREE.Quaternion()
      .setFromUnitVectors(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3().fromArray(playerSpaceShip.direction)
      )
      .toArray();
  }
}
