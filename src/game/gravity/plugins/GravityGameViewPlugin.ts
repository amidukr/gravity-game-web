import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameConsoleViewBinder as DebugConsoleBinderView } from "../features/framework/debug/GameConsoleViewBinder";
import { GravitySceneRenderer } from "../features/view-rendering/gravity-scene-renderer/GravitySceneRenderer";

export class GravityGameViewPlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: ApplicationContainer) {
    // application.registerComponent(new ScaleSunSizeLoop());

    application.registerComponent(new GravitySceneRenderer());

    application.registerComponent(new DebugConsoleBinderView());
  }
}
