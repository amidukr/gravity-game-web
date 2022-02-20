import { BaseGameScene } from "../../../../../../common/game/engine/framework/GameModelTypes";

export class UniverseSceneObjects {}

export class GravityUniverseSceneObjectsModel extends BaseGameScene<UniverseSceneObjects> {
  construtNewObject(): UniverseSceneObjects {
    throw new UniverseSceneObjects();
  }
}
