import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BasePlugin } from "../../../../../common/app/utils/BasePlugin";
import { GravityUniverseLoader } from "./loader/GravityUniverseLoader";
import { GravityUniverseSceneLoader } from "./loader/GravityUniverseSceneLoader";
import { GravityUniverseModel } from "./model/GravityUniverseModel";
import { GravityUniverseService } from "./service/GravityUniverseService";

class GravityUniverseCorePlugin extends BasePlugin {
  registerComponents(application: ApplicationContainer): void {
    application.registerComponent(new GravityUniverseLoader());
    application.registerComponent(new GravityUniverseModel());
    application.registerComponent(new GravityUniverseService());
  }
}

class GravityUniverseViewPlugin extends BasePlugin {
  registerComponents(application: ApplicationContainer): void {
    application.registerComponent(new GravityUniverseSceneLoader());
    //application.registerComponent(new GravityUniverseSceneObjectsModel())
  }
}

export class GravityUniverseModule {
  static CORE = GravityUniverseCorePlugin;
  static VIEW = GravityUniverseViewPlugin;
}
