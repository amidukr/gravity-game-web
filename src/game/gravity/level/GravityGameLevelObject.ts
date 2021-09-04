import { CubeTexture, Group, Texture } from "three";
import { typeIdentifier } from "../../../common/app/lookup/TypeIdentifier";
import { GameLevel } from "../../../common/framework/game/level/GameLevel";
import {
  ThreeJsGameLevelObject,
  ThreeJsGameLevelObjectData,
} from "../../../common/framework/game/integrations/threejs/objects/ThreeJsGameLevelObject";

export const TYPE_GravityGameLevel =
  typeIdentifier<GravityGameLevel>(GameLevel);

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
