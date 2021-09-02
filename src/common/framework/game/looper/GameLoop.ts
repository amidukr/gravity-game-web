import { Application } from "../../../app/Application";
import { typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { GameEvent } from "../GameEvent";

export const TYPE_GameLooper = typeIdentifier<GameLoop>("amid_ukr_ge_GameLoop");

export interface GameLoop {
  start?(application: Application): void;
  execute(event: GameEvent): void;
}
