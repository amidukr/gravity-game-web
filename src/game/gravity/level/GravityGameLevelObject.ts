import { typeIdentifier } from "../../../common/app/lookup/TypeIdentifier";
import { ThreeJsGameLevelObject, ThreeJsGameLevelObjectData } from "../../../common/framework/game/3rd-party/threejs/objects/ThreeJsGameLevelObject";
import { GameLevel } from "../../../common/framework/game/features/level/GameLevel";

export c../../../common/engine/game/3rd-party/threejs/objects/ThreeJsGameLevelObject
../../../common/engine/game/features/level/GameLevel
export type GravityGameLevel = GameLevel<GravityGameLevelObject>;

export interface GravityGameLevelObjectData extends ThreeJsGameLevelObjectData {
  spaceShips: {
    player: {
      throttle?: number;
    };
  };
}

export class GravityGameLevelObject extends ThreeJsGameLevelObject {
  override data: GravityGameLevelObjectData = undefined as any;
}
