import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEngineThreeJsRenderer } from "../../../common/framework/game/3rd-party/threejs/GameEngineThreeJsRenderer";
import { ThreeJsGameLevelRepository } from "../../../common/framework/game/3rd-party/threejs/ThreeJsGameLevelRepository";
import { AutowiredGameEngineConfigurer } from "../../../common/framework/game/loader/configurer/AutowiredGameEnginerConfigurer";
import { GameEnginePlugin } from "../../../common/framework/game/plugins/GameEnginePlugin";
import { ApplicationWindowVariablePlugin } from "../../../common/plugins/ApplicationWindowVariablePlugin";
import { ReactStarter, TYPE_ReactRootWidget } from "../../../common/ui/ReactStarter";
import { MainViewInputMappings } from "../input/mappings/GravityGameInputMappings";
import { GravityGameLoader } from "../loader/GravityGameLoader";
import { GravityGameStarter } from "../starters/GravityGameStarter";
import { RootWidget } from "../views/GravityGameRootWidget";

export class GravityGameEnginePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: Application) {
    // Register windows.application
    application.registerComponent(new ApplicationWindowVariablePlugin());

    // Register game engine modules
    application.registerComponent(new GameEnginePlugin());

    application.registerComponent(
      new GameEngineThreeJsRenderer({
        webGlRenderingParameters: {
          antialias: true,
          preserveDrawingBuffer: true,
          //logarithmicDepthBuffer: true
        },
      })
    );

    application.registerComponent(new AutowiredGameEngineConfigurer());
    application.registerComponent(new ReactStarter());

    // UI Entry point
    Introspection.bindInterfaceName(RootWidget, TYPE_ReactRootWidget);
    application.registerComponent(RootWidget);

    // Register Gravity Game components
    application.registerComponent(new ThreeJsGameLevelRepository());
    application.registerComponent(new GravityGameLoader());
    application.registerComponent(new MainViewInputMappings());

    // Starter
    application.registerComponent(new GravityGameStarter());
  }
}
