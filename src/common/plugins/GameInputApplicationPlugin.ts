import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";

import { GameButtonActionMap } from "../framework/game/input/GameButtonActionMap";
import { GameButtonDeviceInput } from "../framework/game/input/GameButtonDeviceInput";
import { GameAxisDeviceInput } from "../framework/game/input/GameAxisDeviceInput";
import { Application } from "../app/Application";
import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../app/api/ApplicationComponent";

export class GameInputApplicationPlugin implements ApplicationComponent {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  register(application: Application) {
    application.registerComponent(new GameButtonActionMap());
    application.registerComponent(new GameButtonDeviceInput());
    application.registerComponent(new GameAxisDeviceInput());
  }
}
