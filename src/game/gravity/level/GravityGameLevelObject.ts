import { typeIdentifier } from "../../../common/app/lookup/TypeIdentifier";
import {
  ThreeJsGameLevelObject,
  ThreeJsGameLevelObjectData,
} from "../../../common/framework/game/3rd-party/threejs/objects/ThreeJsGameLevelObject";
import { GameLevel } from "../../../common/framework/game/level/GameLevel";

export const TYPE_GravityGameLevel = typeIdentifier<GravityGameLevel>(GameLevel);

export type GravityGameLevel = GameLevel<GravityGameLevelObject>;

export interface GravityGameLevelObjectData extends ThreeJsGameLevelObjectData {
  spaceShips: {
    player: {
      position: number[];
      velocity: number[];
    };
  };
}

export class GravityGameLevelObject extends ThreeJsGameLevelObject {
  override data: GravityGameLevelObjectData = undefined as any;
}
