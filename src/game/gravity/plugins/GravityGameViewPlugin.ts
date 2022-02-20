import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { ThreeJsGameViewSceneModel } from "../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { AtmosphereModule } from "../features/view-rendering/atmosphere/AtmosphereModule";
import { GravitySceneRenderer } from "../features/view-rendering/gravity-scene-renderer/GravitySceneRenderer";
import { ScaleSunSizeLoop } from "../features/view-rendering/scale-sun-size/ScaleSunSizeLoop";

export class GravityGameViewPlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: ApplicationContainer) {
    application.registerComponent(new ThreeJsGameViewSceneModel());
    application.registerComponent(new GravitySceneRenderer());

    application.registerComponent(new AtmosphereModule());
    application.registerComponent(new ScaleSunSizeLoop());
  }
}
