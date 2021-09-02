import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { AutowiredGameEngineConfigurer } from "../../../common/framework/game/level/AutowiredGameEnginerConfigurer";
import { ThreeJsRenderer } from "../../../common/framework/game/rendering/ThreeJsRenderer";
import { ApplicationWindowVariablePlugin } from "../../../common/plugins/ApplicationWindowVariablePlugin";
import { GravityGameLevelRepository } from "../level/GravityGameLevelRepository";
import { GravityGameModelPreprocessor } from "../level/GravityGameModelPreprocessor";
import { GravityRenderingLoop } from "../loops/GravityRenderingLoop";
import { SpaceShipPhysicsLoop } from "../loops/SpaceShipPhysicsLoop";
import { GravityGameStarter } from "../starters/GravityGameStarter";
import {
  ReactStarter,
  TYPE_ReactRootWidget,
} from "../../../common/ui/ReactStarter";
import { GameWidget } from "../../../common/ui/GameWidget";
import { GameEnginePlugin } from "../../../common/plugins/GameEnginePlugin";
import { GravityGameModel } from "../model/GravityGameModel";

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
    application.registerComponent(new GravityGameLevelRepository());
    application.registerComponent(new GravityGameModelPreprocessor());
    application.registerComponent(new GravityGameModel());

    // Starter
    application.registerComponent(new GravityGameStarter());

    // Loopers
    application.registerComponent(new SpaceShipPhysicsLoop());
    application.registerComponent(new GravityRenderingLoop());
  }
}
