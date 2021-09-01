import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { AutowiredGameEngineConfigurer } from "../../../common/framework/game/level/AutowiredGameEnginerConfigurer";
import { ThreeJsRenderer } from "../../../common/framework/game/rendering/ThreeJsRenderer";
import { ApplicationWindowVariablePlugin } from "../../../common/plugins/ApplicationWindowVariablePlugin";
import { GameBootstrapPlugin } from "../../../common/plugins/GameBootstrapPlugin";
import { GravityGameLevelRepository } from "../level/GravityGameLevelRepository";
import { GravityGameModelPreprocessor } from "../level/GravityGameModelPreprocessor";
import { GravityRenderingLooper } from "../looper/GravityRenderingLooper";
import { SpaceShipPhysicsLooper } from "../looper/SpaceShipPhysicsLooper";
import { GravityGameStarter } from "../starters/GravityGameStarter";
import { GravityGameRootWidget } from "../starters/GravityGameRootWidget";

export class GravityGameEnginePlugin implements ApplicationComponent {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: Application) {
    // Register windows.application
    application.registerComponent(new ApplicationWindowVariablePlugin());

    // Register game engine modules
    application.registerComponent(new GameBootstrapPlugin());
    application.registerComponent(new ThreeJsRenderer());
    application.registerComponent(new AutowiredGameEngineConfigurer());

    // Register Gravity Game components
    application.registerComponent(new GravityGameLevelRepository());
    application.registerComponent(new GravityGameModelPreprocessor());

    // Starter
    application.registerComponent(new GravityGameRootWidget());
    application.registerComponent(new GravityGameStarter());

    // Loopers
    application.registerComponent(new SpaceShipPhysicsLooper());
    application.registerComponent(new GravityRenderingLooper());
  }
}
