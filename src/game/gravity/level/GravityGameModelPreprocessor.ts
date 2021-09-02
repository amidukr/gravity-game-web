import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameLevel } from "../../../common/framework/game/level/api/GameLevelRepository";
import {
  GameModelPreprocessor,
  TYPE_GameModelPreprocessor,
} from "../../../common/framework/game/level/api/GameModelPreprocessor";
import { GameModel } from "../../../common/framework/game/model/GameModel";
import * as THREE from "three";
import { GravityPersistentSharedModel } from "../model/entitites/GravityPersistentSharedModel";
import { GravityPersistentLocalModel } from "../model/entitites/GravityPersistentLocalModel";
import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { GravityGameModel } from "../model/GravityGameModel";

export class GravityGameModelPreprocessor
  implements GameModelPreprocessor, ApplicationComponent
{
  private gravityGameModel!: GravityGameModel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameModelPreprocessor);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
    this.gravityGameModel = application.getComponent(GravityGameModel);
  }

  preprocess(gameModel: GameModel, gameLevel: GameLevel): void {
    const persistentShared: GravityPersistentSharedModel =
      gameModel.persistentShared;

    const playerSpaceShip = persistentShared.spaceShips.player;

    const viewQuaternion = new THREE.Quaternion()
      .setFromUnitVectors(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3().fromArray(playerSpaceShip.velocity)
      )
      .toArray();

    this.gravityGameModel.persistentLocal = {
      spaceShips: {
        player: {
          viewQuanterion: viewQuaternion,
        },
      },
    };
  }
}
