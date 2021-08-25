import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";

import { GameButtonActionMap } from "../framework/game/input/GameButtonActionMap";
import { GameButtonDeviceInput } from "../framework/game/input/GameButtonDeviceInput";
import { GameAxisDeviceInput } from "../framework/game/input/GameAxisDeviceInput";

export class GameInputApplicationPlugin {
  constructor() {
    ApplicationComponentMeta.bindComponentFunctionToGlobal(this);
  }

  registerPluginComponents(application) {
    application.registerComponent(new GameButtonActionMap());
    application.registerComponent(new GameButtonDeviceInput());
    application.registerComponent(new GameAxisDeviceInput());
  }
}
