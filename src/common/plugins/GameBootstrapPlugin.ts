import { Application } from "../app/Application";
import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";
import { GameEnginePlugin } from "./GameEnginePlugin";
import { GameInputApplicationPlugin } from "./GameInputApplicationPlugin";

export class GameBootstrapPlugin {
  constructor() {
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  setApplication(application: Application) {
    application.registerComponent(new GameInputApplicationPlugin());
    application.registerComponent(new GameEnginePlugin());
  }
}
