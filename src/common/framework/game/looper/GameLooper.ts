import { Application } from "../../../app/Application";
import { typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { GameEvent } from "../GameEvent";

export const TYPE_GameLooper = typeIdentifier<GameLooper>(
  "amid_ukr_ge_GameLooper"
);

export interface GameLooper {
  start?(application: Application): void;
  run(event: GameEvent): void;
}
