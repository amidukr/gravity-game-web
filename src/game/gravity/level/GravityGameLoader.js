import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GravityRenderingController } from "../controllers/GravityRenderingController";

export class GravityGameLoader {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, "GameLoader");
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  autowire(application) {
    this.application = application;

    this.gameLevelRepository = application.getComponent("GameLevelRepository");
    this.gameVisualResources = application.getComponent("GameVisualResources");
    this.gameEngine = application.getComponent("GameEngine");
  }

  async loadGame(levelDescriptor) {
    const levelData = await this.gameLevelRepository.loadLevel(
      levelDescriptor.levelName
    );

    this.gameVisualResources.set({ rootScene: levelData.rootScene });

    this.gameEngine.registerController(new GravityRenderingController());
  }
}
