import { GameLevelDescriptor } from "../../../common/framework/game/level/GameLevelRepository";

export class GravityGameLevelDescriptor implements GameLevelDescriptor {
  type: "GameLevelDescriptor" = "GameLevelDescriptor";

  constructor(public levelName: string) {}
}
