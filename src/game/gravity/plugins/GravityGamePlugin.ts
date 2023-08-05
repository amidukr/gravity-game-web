import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { ThreeJsGameLevelRepository } from "../../../common/game/engine/3rd-party/threejs/ThreeJsGameLevelRepository";
import { ThreeJsGameRenderer } from "../../../common/game/engine/3rd-party/threejs/ThreeJsGameRenderer";
import { ThreeJsGameViewSceneModel } from "../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { ThreeJsRootSceneLoader } from "../../../common/game/engine/3rd-party/threejs/ThreeJsRootSceneLoader";
import { ThreeJsTaggedScenePrerender } from "../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingLooper";
import { ThreeJsSceneTaggingModel } from "../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { TaggedSceneEngine } from "../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneEngine";
import { GameEnginePlugin } from "../../../common/game/engine/plugins/GameEnginePlugin";
import { ReactStarter, TYPE_ReactRootWidget } from "../../../common/ui/ReactStarter";
import { DebugConsoleCoreBinder as DebugConsoleBinderCore } from "../features/framework/debug/DebugConsoleCoreBinder";
import { DebugInfoModel } from "../features/framework/debug/DebugInfoModel";
import { DebugLoop } from "../features/framework/debug/DebugLoop";
import { MainViewInputMappings } from "../features/input-mappings/GravityGameInputMappings";
import { GravitySpaceObjectsService } from "../features/model-calculation/gravity-universe/service/GravitySpaceObjectsService";
import { PlayerControlModel } from "../features/model-calculation/player-control/PlayerControlModel";
import { DebugAltitudeLoop } from "../features/model-calculation/space-ships/DebugAltitudeLoop";
import { PlayerSpaceShipLoader } from "../features/model-calculation/space-ships/PlayerSpaceShipLoader";
import { SpaceShipsModel } from "../features/model-calculation/space-ships/SpaceShipsModel";
import { ColorfulTaggedController } from "../features/view-rendering/common/ColorfulTagController";
import { GridShaderTagController } from "../features/view-rendering/common/GridShaderTagController";
import { RootTagController } from "../features/view-rendering/root-tag-renderer/RootTagController";
import { GravityGameStarter } from "../starters/GravityGameStarter";
import { RootWidget } from "../ui/GravityGameRootWidget";
import { GravityUniversePlugin } from "./GravityUniverseModule";
import { AtmosphereModule } from "./modules/AtmosphereModule";
import { GravityCloseSpaceObjectModule } from "./modules/GravityCloseSpaceModule";
import { TerraGenerationModule } from "./modules/TerraGenerationModule";

export class GravityGamePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: ApplicationContainer) {
    // Register game engine modules
    application.registerComponent(new GameEnginePlugin());

    application.registerComponent(
      new ThreeJsGameRenderer({
        webGlRenderingParameters: {
          antialias: true,
          preserveDrawingBuffer: true,
          //logarithmicDepthBuffer: true,
        },
      })
    );

    application.registerComponent(new ReactStarter());

    // UI Entry point
    Introspection.bindInterfaceName(RootWidget, TYPE_ReactRootWidget);
    application.registerComponent(RootWidget);

    // Register Gravity Game engine components
    application.registerComponent(new TaggedSceneEngine());

    application.registerComponent(new ThreeJsGameLevelRepository());
    application.registerComponent(new ThreeJsGameViewSceneModel());
    application.registerComponent(new ThreeJsRootSceneLoader());

    application.registerComponent(new ThreeJsSceneTaggingModel());
    application.registerComponent(new ThreeJsTaggedScenePrerender());

    // Loaders and Models
    application.registerComponent(new GravitySpaceObjectsService());
    application.registerComponent(new SpaceShipsModel());
    application.registerComponent(new PlayerControlModel());
    application.registerComponent(new PlayerSpaceShipLoader());

    application.registerComponent(new GravityUniversePlugin());

    application.registerComponent(new MainViewInputMappings());

    // Starter
    application.registerComponent(new GravityGameStarter());

    // Modules
    application.registerComponent(new GravityCloseSpaceObjectModule());
    application.registerComponent(new AtmosphereModule());
    application.registerComponent(new TerraGenerationModule());

    // Tag handlers
    application.registerComponent(new RootTagController());
    application.registerComponent(new ColorfulTaggedController());
    application.registerComponent(new GridShaderTagController());

    // Debug
    application.registerComponent(new DebugInfoModel());
    application.registerComponent(new DebugAltitudeLoop());
    application.registerComponent(new DebugLoop());
    application.registerComponent(new DebugConsoleBinderCore());
  }
}
