import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";
import { LoadGameObject } from "./LoadGameObject";

export const TYPE_GameLoader = typeIdentifier<GameLoader>(
  "amid_ukr_ge_GameLoader"
);

export interface GameLoader {
  loadGameModel(loadGameObject: LoadGameObject): Promise<void>;
}
