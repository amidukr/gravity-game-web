import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GravityGameLevelRepository } from "../level/GravityGameLevelRepository";
import { GravityGameLoader } from "../level/GravityGameLoader";

export class GravityGameEnginePlugin {
  constructor() {
    ApplicationComponentMeta.bindComponentFunctionToGlobal(this);
  }

  registerPluginComponents(application) {
    application.registerComponent(new GravityGameLoader());
    application.registerComponent(new GravityGameLevelRepository());
  }
}
