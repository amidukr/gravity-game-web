import { CubeTexture, Group, Texture } from "three";
import { GameLevelObject } from "../../level/GameLevelObject";

export interface ThreeJsGameLevelObjectData {
  levelSceneFile: string;
  backgroundFiles: string[];
}

export class ThreeJsGameLevelObject implements GameLevelObject {
  type: "GameLevelObject" = "GameLevelObject";
  levelFolder!: string;

  data!: ThreeJsGameLevelObjectData;

  rootScene!: Group;
  backhroundTexture!: Texture;
}
