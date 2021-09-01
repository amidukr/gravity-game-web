import { Application } from "../../../common/app/Application";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { ThreeJsRenderer } from "../../../common/framework/game/rendering/ThreeJsRenderer";
import { ApplicationWindowVariablePlugin } from "../../../common/plugins/ApplicationWindowVariablePlugin";
import { GameBootstrapPlugin } from "../../../common/plugins/GameBootstrapPlugin";
import { GravityGameEngineConfigurer } from "../level/GravityGameEngineConfigurer";
import { GravityGameLevelRepository } from "../level/GravityGameLevelRepository";
import { GravityGameModelPreprocessor } from "../level/GravityGameModelPreprocessor";

export class GravityGameEnginePlugin {
  constructor() {
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  setApplication(application: Application) {
    application.registerComponent(new ApplicationWindowVariablePlugin());

    application.registerComponent(new GameBootstrapPlugin());
    application.registerComponent(new ThreeJsRenderer());

    application.registerComponent(new GravityGameLevelRepository());
    application.registerComponent(new GravityGameEngineConfigurer());
    application.registerComponent(new GravityGameModelPreprocessor());
  }
}
