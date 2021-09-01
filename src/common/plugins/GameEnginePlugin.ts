import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../app/api/ApplicationComponent";
import { Application } from "../app/Application";
import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";
import { GameEngine } from "../framework/game/GameEngine";
import { GameModel } from "../framework/game/model/GameModel";
import { GameVisualResources } from "../framework/game/rendering/GameVisualResources";

export class GameEnginePlugin implements ApplicationComponent {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  register(application: Application) {
    application.registerComponent(new GameEngine());
    application.registerComponent(new GameModel());
    application.registerComponent(new GameVisualResources());
  }
}
