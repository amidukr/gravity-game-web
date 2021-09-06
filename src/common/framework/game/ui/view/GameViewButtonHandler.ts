import { Application } from "../../../../app/Application";
import { InputButton } from "../../input/types/InputButton";
import { GameView } from "./GameView";

export interface GameViewButtonHandler {
  start?(application: Application, gameView: GameView): void | Promise<any>;
  keyPressed(button: InputButton): void;
}