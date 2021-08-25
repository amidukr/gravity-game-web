import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GravityRenderingController } from "../controllers/GravityRenderingController";

export class GravityGameLoader {
  constructor() {
    const self = this;

    ApplicationComponentMeta.bindToInterfaceName(this, "GameLoader");

    ApplicationComponentMeta.registerGlobalFunction(
      this,
      function autowireApplicationComponent(application) {
        self.gameLevelRepository = application.getComponentByInterfaceName(
          "GameLevelRepository"
        );
        self.gameVisualResources = application.getComponentByInterfaceName(
          "GameVisualResources"
        );
        self.gameEngine = application.getComponentByInterfaceName("GameEngine");
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
