import { ApplicationContainer } from "../../../../common/app/ApplicationContainer";
import { BasePlugin } from "../../../../common/app/utils/BasePlugin";
import { AtmosphereTagController } from "../../features/view-rendering/atmosphere/AtmosphereController";

export class AtmosphereModule extends BasePlugin {
  registerComponents(application: ApplicationContainer): void {
    application.registerComponent(new AtmosphereTagController());
  }
}
