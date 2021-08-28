import { Application } from "../app/Application";
import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";
import { GameEngine } from "../framework/game/GameEngine";
import { GameModel } from "../framework/game/model/GameModel";
import { GameVisualResources } from "../framework/game/rendering/GameVisualResources";

export class GameEnginePlugin {
  constructor() {
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  register(application: Application) {
    application.registerComponent(new GameEngine());
    application.registerComponent(new GameModel());
    application.registerComponent(new GameVisualResources());
  }
}
