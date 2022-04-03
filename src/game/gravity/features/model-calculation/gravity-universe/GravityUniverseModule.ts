import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BasePlugin } from "../../../../../common/app/utils/BasePlugin";
import { GravityUniverseLoader } from "./loader/GravityUniverseLoader";
import { GravityUniversePositionRecalculateLooper } from "./looper/GravityUniversePositionRecalculateLooper";
import { GravityUniversePositionLooper } from "./looper/GravityUniverseScenePositionLooper";
import { GravityUniverseModel } from "./model/GravityUniverseModel";
import { GravityUniverseService } from "./service/GravityUniverseService";

export class GravityUniversePlugin extends BasePlugin {
  registerComponents(application: ApplicationContainer): void {
    application.registerComponent(new GravityUniverseLoader());
    application.registerComponent(new GravityUniverseModel());
    application.registerComponent(new GravityUniverseService());

    application.registerComponent(new GravityUniversePositionRecalculateLooper());

    // TODO: remove commented code
    // application.registerComponent(new GravityUniverseSceneLoader());
    application.registerComponent(new GravityUniversePositionLooper());
  }
}
