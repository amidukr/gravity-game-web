import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { Introspection } from "../../../../app/lookup/Introspection";
import { GameLevel } from "../../level/GameLevel";
import { GameLevelRepository, TYPE_GameLevelRepository } from "../../level/GameLevelRepository";
import { GameLoaderModule, TYPE_GameLoaderModule } from "../GameLoaderModule";
import { LoadGameObject } from "../object/LoadGameObject";

export class LoadGameLevelModule implements ApplicationComponent, GameLoaderModule {
  gameLevel!: GameLevel;
  gameLevelRepository!: GameLevelRepository;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
    Introspection.bindInterfaceName(this, TYPE_GameLoaderModule);
  }

  autowire(application: ApplicationContainer) {
    this.gameLevel = application.getComponent(GameLevel);
    this.gameLevelRepository = application.getComponent(TYPE_GameLevelRepository);
  }

  async startNewGame(loadGameObject: LoadGameObject): Promise<void> {
    this.gameLevel.object = await this.gameLevelRepository.loadLevel(loadGameObject.levelDescriptor);
  }
}
