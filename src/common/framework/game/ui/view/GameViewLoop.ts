import { Application } from "../../../../app/Application";
import { GameEvent } from "../../GameEvent";
import { GameView } from "./GameView";

export interface GameViewLoop {
  start?(application: Application, gameView: GameView): void;
  execute(event: GameEvent, gameView: GameView): void;
}
