import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { GameEvent } from "../../GameEvent";
import { GameView } from "./GameView";

export interface GameViewLoop {
  startNewGame?(application: ApplicationContainer, gameView: GameView): void;
  execute(event: GameEvent, gameView: GameView): void;
}
