import { Application } from "../../../app/Application";
import { GameEvent } from "../GameEvent";

export interface GameLooper {
  start?(application: Application): void;
  run(event: GameEvent): void;
}
