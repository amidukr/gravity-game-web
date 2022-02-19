import { typeIdentifier } from "../../../app/lookup/TypeIdentifier";

export const TYPE_GameLoopStarter = typeIdentifier<GameLoopStarter>("amid_ukr_ge_GameLoopStarter");

export interface GameLoopStarter {
  startNewGame(): void | Promise<void>;
}
