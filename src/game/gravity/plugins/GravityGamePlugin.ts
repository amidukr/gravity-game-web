import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEngineThreeJsRenderer } from "../../../common/framework/game/3rd-party/threejs/GameEngineThreeJsRenderer";
import { ThreeJsGameLevelRepository } from "../../../common/framework/game/3rd-party/threejs/ThreeJsGameLevelRepository";
import { GameEnginePlugin } from "../../../common/framework/game/plugins/GameEnginePlugin";
import { ReactStarter, TYPE_ReactRootWidget } from "../../../common/ui/ReactStarter";
import { MainViewInputMappings } from "../input/mappings/GravityGameInputMappings";
import { AtmosphereModule } from "../loader/AtmosphereModule";
import { GravityGameLoader } from "../loader/GravityGameLoader";
import { DebugAltitudeLoop } from "../loops/debug/DebugAltitudeLoop";
import { DebugLoop } from "../loops/debug/DebugLoop";
import { ScaleSunSizeLoop } from "../loops/ScaleSunSizeLoop";
import { DebugInfoModel } from "../model/DebugInfoModel";
import { GravitySceneModel } from "../model/GravitySceneModel";
import { PlayerViewModel } from "../model/PlayerControlModel";
import { SpaceShipsModel } from "../model/SpaceShipsModel";
import { GravityGameStarter } from "../starters/GravityGameStarter";
import { RootWidget } from "../ui/GravityGameRootWidget";

export class GravityGameEnginePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: ApplicationContainer) {
    // Register game engine modules
    application.registerComponent(new GameEnginePlugin());

    application.registerComponent(
      new GameEngineThreeJsRenderer({
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

    // Register Gravity Game components
    application.registerComponent(new ThreeJsGameLevelRepository());

    // Loaders and Models
    application.registerComponent(new GravitySceneModel());
    application.registerComponent(new SpaceShipsModel());
    application.registerComponent(new PlayerViewModel());

    application.registerComponent(new GravityGameLoader());
    application.registerComponent(new AtmosphereModule());

    application.registerComponent(new MainViewInputMappings());

    // Starter
    application.registerComponent(new GravityGameStarter());

    // Loops
    application.registerComponent(new ScaleSunSizeLoop());

    // Debug
    application.registerComponent(new DebugInfoModel());

    application.registerComponent(new DebugAltitudeLoop());

    application.registerComponent(new DebugLoop());
  }
}
