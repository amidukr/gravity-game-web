import { Application } from "../../../app/Application";
import { GameEvent } from "../GameEvent";

export interface GameController {
  start?(application: Application): void;
  execute(event: GameEvent): void;
}
