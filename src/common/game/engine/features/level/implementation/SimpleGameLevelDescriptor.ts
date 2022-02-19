import { GameLevelDescriptor } from "../GameLevelRepository";

export class SimpleGameLevelDescriptor implements GameLevelDescriptor {
  type: "GameLevelDescriptor" = "GameLevelDescriptor";

  constructor(public levelName: string) {}
}
