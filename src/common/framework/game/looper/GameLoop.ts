import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { GameEvent } from "../GameEvent";

export const TYPE_GameLooper = typeIdentifier<GameLoop>("amid_ukr_ge_GameLoop");

export interface GameLoop {
  startNewGame?(application: ApplicationContainer): void;
  execute(event: GameEvent): void;
}
