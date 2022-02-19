import { GameLevelObject } from "./GameLevelObject";

export class GameLevel<O extends GameLevelObject = GameLevelObject> {
  public object!: O;
}
