import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BasePlugin } from "../../../common/app/utils/BasePlugin";
import { PlaneSurfaceTaggedController } from "../features/view-rendering/close-space-renderer/controllers/PlaneSurfaceTaggedController";
import { GravityCloseSpaceLoop } from "../features/view-rendering/close-space-renderer/GravityCloseSpaceLoop";
import { GravityCloseSpaceRenderer } from "../features/view-rendering/close-space-renderer/GravityCloseSpaceRenderer";
import { CloseSpaceSceneTagHandler } from "../features/view-rendering/root-tag-renderer/CloseSpaceSceneTagHandler";

export class GravityCloseSpaceObjectModule extends BasePlugin {
  override registerComponents(application: ApplicationContainer): void {
    application.registerComponent(new GravityCloseSpaceRenderer());
    application.registerComponent(new GravityCloseSpaceLoop());

    application.registerComponent(new PlaneSurfaceTaggedController());

    application.registerComponent(new CloseSpaceSceneTagHandler());
  }
}
