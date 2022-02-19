import { GameLevelDescriptor } from "../GameLevelRepository";
import { LoadGameLevelArgumentsObject } from "../RepositoryGameLevelLoader";

export class SimpleGameLevelDescriptor implements GameLevelDescriptor {
  readonly type: "GameLevelDescriptor" = "GameLevelDescriptor";

  constructor(readonly levelName: string) {}
}

export class SimpleLoadLevelGameArgument implements LoadGameLevelArgumentsObject {
  readonly levelDescriptor: GameLevelDescriptor;
  readonly type: "LoadGameArgumentsObject" = "LoadGameArgumentsObject";

  constructor(levelName: string) {
    this.levelDescriptor = new SimpleGameLevelDescriptor(levelName);
  }
}
