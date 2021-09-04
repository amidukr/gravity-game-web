import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { AutowiredGameEngineConfigurer } from "../../../common/framework/game/loader/configurer/AutowiredGameEnginerConfigurer";
import { ThreeJsRenderer } from "../../../common/framework/game/threejs/ThreeJsRenderer";
import { ApplicationWindowVariablePlugin } from "../../../common/plugins/ApplicationWindowVariablePlugin";
import { ThreeJsGameLevelRepository } from "../../../common/framework/game/threejs/ThreeJsGameLevelRepository";
import { GravityGameLoader } from "../loader/GravityGameLoader";
import { GravityRenderingLoop } from "../loops/GravityRenderingLoop";
import { SpaceShipPhysicsLoop } from "../loops/SpaceShipPhysicsLoop";
import { GravityGameStarter } from "../starters/GravityGameStarter";
import {
  ReactStarter,
  TYPE_ReactRootWidget,
} from "../../../common/ui/ReactStarter";
import { GameWidget } from "../../../common/ui/GameWidget";
import { GameEnginePlugin } from "../../../common/plugins/GameEnginePlugin";

export class GravityGameEnginePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: Application) {
    // Register windows.application
    application.registerComponent(new ApplicationWindowVariablePlugin());

    // Register game engine modules
    application.registerComponent(new GameEnginePlugin());
    application.registerComponent(new ThreeJsRenderer());
    application.registerComponent(new AutowiredGameEngineConfigurer());
    application.registerComponent(new ReactStarter());

    // UI Entry point
    Introspection.bindInterfaceName(GameWidget, TYPE_ReactRootWidget);
    application.registerComponent(GameWidget);

    // Register Gravity Game components
    application.registerComponent(new ThreeJsGameLevelRepository());
    application.registerComponent(new GravityGameLoader());

    // Starter
    application.registerComponent(new GravityGameStarter());

    // Loopers
    application.registerComponent(new SpaceShipPhysicsLoop());
    application.registerComponent(new GravityRenderingLoop());
  }
}
