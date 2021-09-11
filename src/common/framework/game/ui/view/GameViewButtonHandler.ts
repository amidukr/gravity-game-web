import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { InputButton } from "../../input/types/InputButton";
import { GameView } from "./GameView";

export interface GameViewButtonHandler {
  startNewGame?(application: ApplicationContainer, gameView: GameView): void | Promise<any>;
  keyPressed(button: InputButton): void;
}
