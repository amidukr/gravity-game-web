import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GravityRenderingController } from "../controllers/GravityRenderingController";

export class GravityGameLoader {
  constructor() {
    const self = this;

    ApplicationComponentMeta.bindInterfaceName(this, "GameLoader");

    ApplicationComponentMeta.registerGlobalFunction(
      this,
      function autowire(application) {
        self.gameLevelRepository = application.getComponent(
          "GameLevelRepository"
        );
        self.gameVisualResources = application.getComponent(
          "GameVisualResources"
        );
        self.gameEngine = application.getComponent("GameEngine");
      }
    );

    console.info(this);
  }

  async loadGame(levelDescriptor) {
    const levelData = await this.gameLevelRepository.loadLevel(
      levelDescriptor.levelName
    );

    this.gameVisualResources.set({ rootScene: levelData.rootScene });

    this.gameEngine.registerController(new GravityRenderingController());
  }
}
