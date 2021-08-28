import { Application } from "../../../common/app/Application";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { ThreeJsRenderer } from "../../../common/framework/game/rendering/ThreeJsRenderer";
import { ApplicationWindowVariablePlugin } from "../../../common/plugins/ApplicationWindowVariablePlugin";
import { GameBootstrapPlugin } from "../../../common/plugins/GameBootstrapPlugin";
import { GravityGameLevelRepository } from "../level/GravityGameLevelRepository";
import { GravityGameLoader } from "../level/GravityGameLoader";

export class GravityGameEnginePlugin {
  constructor() {
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  setApplication(application: Application) {
    application.registerComponent(new GravityGameLoader());
    application.registerComponent(new GravityGameLevelRepository());
    application.registerComponent(new ThreeJsRenderer());
    application.registerComponent(new GameBootstrapPlugin());
    application.registerComponent(new ApplicationWindowVariablePlugin());
  }
}
