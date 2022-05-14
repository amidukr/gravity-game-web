import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BasePlugin } from "../../../common/app/utils/BasePlugin";
import { AtmosphereLoader } from "../features/view-rendering/atmosphere/AtmosphereLoader";
import { AtmosphereLooper } from "../features/view-rendering/atmosphere/AtmosphereLooper";

export class AtmosphereModule extends BasePlugin {
  registerComponents(application: ApplicationContainer): void {
    application.registerComponent(new AtmosphereLoader());
    application.registerComponent(new AtmosphereLooper());
  }
}
