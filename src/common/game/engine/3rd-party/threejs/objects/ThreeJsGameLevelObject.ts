import { Group, Texture } from "three";
import { resolveTypeIdentifier } from "../../../../../app/lookup/TypeIdentifier";
import { GameLevel, GameLevelObject } from "../../../features/level/GameLevel";

export const TYPE_ThreeJsGameLevel = resolveTypeIdentifier<ThreeJsGameLevel>(GameLevel);

export type ThreeJsGameLevel = GameLevel<ThreeJsGameLevelObject>;

export interface ThreeJsGameLevelObjectData {
  levelSceneFile: string;
  backgroundFiles: string[];
}

export class ThreeJsGameLevelObject implements GameLevelObject {
  type: "GameLevelObject" = "GameLevelObject";
  resourceRootFolder!: string;
  levelFolder!: string;

  data!: ThreeJsGameLevelObjectData;

  rootScene!: Group;
  backhroundTexture!: Texture;
}
