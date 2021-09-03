import { Group } from "three";
import { typeIdentifier } from "../../../common/app/lookup/TypeIdentifier";
import { GameLevel } from "../../../common/framework/game/level/GameLevel";
import { GameLevelObject } from "../../../common/framework/game/level/GameLevelObject";

export const TYPE_GravityGameLevel =
  typeIdentifier<GravityGameLevel>(GameLevel);

export type GravityGameLevel = GameLevel<GravityGameLevelObject>;

export class GravityGameLevelObject implements GameLevelObject {
  type: "GameLevelObject" = "GameLevelObject";

  data!: {
    spaceShips: {
      player: {
        position: number[];
        velocity: number[];
      };
    };
  };

  rootScene!: Group;
}
