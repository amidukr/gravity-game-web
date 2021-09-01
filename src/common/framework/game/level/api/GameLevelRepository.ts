import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";

export const TYPE_GameLevelRepository = typeIdentifier<GameLevelRepository>(
  "amid_ukr_ge_GameLevelRepository"
);

export type GameLevel = {
  data: {
    persistentShared: any;
    persistentLocal: any;
    transient: any;
  };

  rootScene: any;
};

export interface GameLevelRepository {
  loadLevel(levelName: string): Promise<GameLevel>;
}
