import { typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { GameLevelObject } from "./GameLevelObject";

export const TYPE_GameLevelRepository = typeIdentifier<GameLevelRepository>(
  "amid_ukr_ge_GameLevelRepository"
);

export interface GameLevelDescriptor {
  type: "GameLevelDescriptor";
}

export interface GameLevelRepository {
  loadLevel(levelDescriptor: GameLevelDescriptor): Promise<GameLevelObject>;
}
