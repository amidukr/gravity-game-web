import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BasePlugin } from "../../../common/app/utils/BasePlugin";
import { UniverseSublocationService } from "../features/commons/universe-sublocation/UniverseSublocationService";
import { GravityUsslh } from "../features/model-calculation/gravity-sublocation/GravityUsslh";
import { GravityUniverseLoader } from "../features/model-calculation/gravity-universe/loader/GravityUniverseLoader";
import { GravityUniversePositionRecalculateLooper } from "../features/model-calculation/gravity-universe/looper/GravityUniversePositionRecalculateLooper";
import { GravityUniversePositionLooper } from "../features/model-calculation/gravity-universe/looper/GravityUniverseScenePositionLooper";
import { GravityUniverseModel } from "../features/model-calculation/gravity-universe/model/GravityUniverseModel";
import { GravityUniverseService } from "../features/model-calculation/gravity-universe/service/GravityUniverseService";

export class GravityUniversePlugin extends BasePlugin {
  registerComponents(application: ApplicationContainer): void {
    application.registerComponent(new GravityUniverseLoader());
    application.registerComponent(new GravityUniverseModel());
    application.registerComponent(new GravityUniverseService());

    application.registerComponent(new GravityUniversePositionRecalculateLooper());

    application.registerComponent(new GravityUniversePositionLooper());

    application.registerComponent(new UniverseSublocationService());
    application.registerComponent(new GravityUsslh());
  }
}
