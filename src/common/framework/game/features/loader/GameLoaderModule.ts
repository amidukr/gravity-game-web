import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";
import { LoadGameObject } from "./object/LoadGameObject";

export const TYPE_GameLoaderModule = typeIdentifier<GameLoaderModule>("amid_ukr_ge_GameLoaderModule");

export interface GameLoaderModule {
  startNewGame(loadGameObject: LoadGameObject): Promise<void> | void;
}
