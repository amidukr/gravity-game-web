import { resolveTypeIdentifier } from "../../../../../common/app/lookup/TypeIdentifier";
import { ThreeJsGameLevelObject, ThreeJsGameLevelObjectData } from "../../../../../common/game/engine/3rd-party/threejs/objects/ThreeJsGameLevelObject";
import { GameLevel } from "../../../../../common/game/engine/features/level/GameLevel";

export const TYPE_GravityGameLevel = resolveTypeIdentifier<GravityGameLevel>(GameLevel);

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
