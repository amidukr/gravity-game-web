import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { GameLevel } from "../../level/GameLevel";
import { GameLevelRepository, TYPE_GameLevelRepository } from "../../level/GameLevelRepository";
import { BaseGameLoaderModule } from "../BaseGameLoaderModule";
import { LoadGameObject } from "../object/LoadGameObject";

export class LoadGameLevelModule extends BaseGameLoaderModule {
  gameLevel!: GameLevel;
  gameLevelRepository!: GameLevelRepository;

  autowire(application: ApplicationContainer) {
    this.gameLevel = application.getComponent(GameLevel);
    this.gameLevelRepository = application.getComponent(TYPE_GameLevelRepository);
  }

  async startNewGame(loadGameObject: LoadGameObject): Promise<void> {
    this.gameLevel.object = await this.gameLevelRepository.loadLevel(loadGameObject.levelDescriptor);
  }
}
