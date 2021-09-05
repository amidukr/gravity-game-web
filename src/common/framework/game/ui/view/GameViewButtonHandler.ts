import { GameView } from "./GameView";
import { InputButton } from "../../input/types/InputButton";
import { Application } from "../../../../app/Application";

export interface GameViewButtonHandler {
    start?(application: Application, gameView: GameView): void | Promise<any>
    keyPressed(button: InputButton): void
}