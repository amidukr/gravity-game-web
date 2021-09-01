import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";
import { GameModel } from "../../model/GameModel";
import { GameLevel } from "./GameLevelRepository";

export const TYPE_GameModelPreprocessor = typeIdentifier<GameModelPreprocessor>(
  "GameModelPreprocessor"
);

export interface GameModelPreprocessor {
  preprocess(gameModel: GameModel, gameLevel: GameLevel): void;
}
