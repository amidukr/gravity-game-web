import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { ThreeJsGameViewSceneModel } from "../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { SceneObjectMetaModel } from "../../../common/game/engine/features/rendering/SceneObjectMeta";
import { GravityUniverseModule } from "../features/model-calculation/gravity-universe/GravityUniverseModule";
import { AtmosphereModule } from "../features/view-rendering/atmosphere/AtmosphereModule";
import { GravitySceneRenderer } from "../features/view-rendering/gravity-scene-renderer/GravitySceneRenderer";
import { ScaleSunSizeLoop } from "../features/view-rendering/scale-sun-size/ScaleSunSizeLoop";

export class GravityGameViewPlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: ApplicationContainer) {
    application.registerComponent(new ThreeJsGameViewSceneModel());
    application.registerComponent(new SceneObjectMetaModel());

    application.registerComponent(new GravityUniverseModule.VIEW());
    application.registerComponent(new AtmosphereModule());
    application.registerComponent(new ScaleSunSizeLoop());

    application.registerComponent(new GravitySceneRenderer());
  }
}
