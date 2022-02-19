export interface GameLevelObject {
  type: "GameLevelObject";
  levelFolder: string;
}

export class GameLevel<O extends GameLevelObject = GameLevelObject> {
  public object!: O;
}
