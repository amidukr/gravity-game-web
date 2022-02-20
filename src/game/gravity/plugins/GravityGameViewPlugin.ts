import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { ThreeJsGameViewSceneModel } from "../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { AtmosphereModule } from "../loader/AtmosphereModule";
import { GravityViewRenderer } from "../loops/GravityViewRenderer";
import { ScaleSunSizeLoop } from "../loops/ScaleSunSizeLoop";

export class GravityGameViewPlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: ApplicationContainer) {
    application.registerComponent(new ThreeJsGameViewSceneModel());
    application.registerComponent(new GravityViewRenderer());
    application.registerComponent(new AtmosphereModule());
    application.registerComponent(new ScaleSunSizeLoop());
  }
}
