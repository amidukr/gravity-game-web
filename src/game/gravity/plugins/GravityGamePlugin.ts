import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { ThreeJsGameLevelRepository } from "../../../common/game/engine/3rd-party/threejs/ThreeJsGameLevelRepository";
import { ThreeJsGameRenderer } from "../../../common/game/engine/3rd-party/threejs/ThreeJsGameRenderer";
import { GameEnginePlugin } from "../../../common/game/engine/plugins/GameEnginePlugin";
import { ReactStarter, TYPE_ReactRootWidget } from "../../../common/ui/ReactStarter";
import { DebugInfoModel } from "../debug/DebugInfoModel";
import { DebugLoop } from "../debug/DebugLoop";
import { GravitySceneModel } from "../features/gravity-universe/GravitySceneModel";
import { PlayerControlModel } from "../features/player-control/PlayerControlModel";
import { DebugAltitudeLoop } from "../features/space-ships/DebugAltitudeLoop";
import { GravityGameLoader } from "../features/space-ships/PlayerSpaceShipLoader";
import { SpaceShipsModel } from "../features/space-ships/SpaceShipsModel";
import { MainViewInputMappings } from "../input/mappings/GravityGameInputMappings";
import { GravityGameStarter } from "../starters/GravityGameStarter";
import { RootWidget } from "../ui/GravityGameRootWidget";

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

    // Register Gravity Game components
    application.registerComponent(new ThreeJsGameLevelRepository());

    // Loaders and Models
    application.registerComponent(new GravitySceneModel());
    application.registerComponent(new SpaceShipsModel());
    application.registerComponent(new PlayerControlModel());

    application.registerComponent(new GravityGameLoader());

    application.registerComponent(new MainViewInputMappings());

    // Starter
    application.registerComponent(new GravityGameStarter());

    // Debug
    application.registerComponent(new DebugInfoModel());

    application.registerComponent(new DebugAltitudeLoop());

    application.registerComponent(new DebugLoop());
  }
}
