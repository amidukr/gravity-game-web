import { GameModelObject } from "./GameModelObject";

export class GameModel<O extends GameModelObject = GameModelObject> {
  object!: O;
}
