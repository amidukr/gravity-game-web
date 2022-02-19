import { Group, Texture } from "three";
import { GameLevelObject } from "../../../features/level/GameLevel";

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
