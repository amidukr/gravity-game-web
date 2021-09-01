import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";
import { GameEngine } from "../../GameEngine";

export const TYPE_GameEngineConfigurer = typeIdentifier<GameEngineConfigurer>(
  "GameEngineConfigurer"
);

export interface GameEngineConfigurer {
  configure(gameEngine: GameEngine): void;
}
