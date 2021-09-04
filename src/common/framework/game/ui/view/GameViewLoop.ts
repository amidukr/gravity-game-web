import { Application } from "../../../../app/Application";
import { GameEvent } from "../../GameEvent";
import { GameView } from "./GameView";

export interface GameViewLoop {
  start?(gameView: GameView, application: Application): void;
  execute(gameView: GameView, event: GameEvent): void;
}
