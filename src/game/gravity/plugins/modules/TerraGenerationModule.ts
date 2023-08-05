import { ApplicationContainer } from "../../../../common/app/ApplicationContainer";
import { BasePlugin } from "../../../../common/app/utils/BasePlugin";
import { TerraPlanetTagController } from "../../features/view-rendering/terra-generation/TerraPlanetTagHandler";

export class TerraGenerationModule extends BasePlugin {
  registerComponents(application: ApplicationContainer): void {
    application.registerComponent(new TerraPlanetTagController());
  }
}