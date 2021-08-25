import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";
import { GameEnginePlugin } from "./GameEnginePlugin";
import { GameInputApplicationPlugin } from "./GameInputApplicationPlugin";

export class GameBootstrapPlugin {
  constructor() {
    ApplicationComponentMeta.bindComponentFunctionToGlobal(this);
  }

  onComponentRegistered(application) {
    application.registerComponent(new GameInputApplicationPlugin());
    application.registerComponent(new GameEnginePlugin());
  }
}
