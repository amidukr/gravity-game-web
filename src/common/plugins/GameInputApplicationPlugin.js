import { ApplicationGlobalFunctions } from "../app/lookup/ApplicationGlobalFunctions";

import { GameKeyActionMap } from "../framework/input/GameKeyActionMap";
import { GameKeyboardInput } from "../framework/input/GameKeyboardInput";
import { GameMouseInput } from "../framework/input/GameMouseInput";

export class GameInputApplicationPlugin {
  constructor() {
    ApplicationGlobalFunctions.registerFunction(
      this,
      function registerPluginComponents(application) {
        application.registerComponent(new GameKeyActionMap());
        application.registerComponent(new GameKeyboardInput());
        application.registerComponent(new GameMouseInput());
      }
    );
  }
}
