import { ApplicationContainer } from "../../../../common/app/ApplicationContainer";
import { BasePlugin } from "../../../../common/app/utils/BasePlugin";
import { CloseSpaceSceneTagHandler } from "../../features/view-rendering/root-tag-renderer/CloseSpaceSceneTagHandler";

export class GravityCloseSpaceObjectModule extends BasePlugin {
  override registerComponents(application: ApplicationContainer): void {
    application.registerComponent(new CloseSpaceSceneTagHandler());
  }
}
