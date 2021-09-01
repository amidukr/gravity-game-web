import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../app/api/ApplicationComponent";
import { Application } from "../app/Application";
import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";
import { GameEngine } from "../framework/game/GameEngine";
import { GameAxisDeviceInput } from "../framework/game/input/GameAxisDeviceInput";
import { GameButtonActionMap } from "../framework/game/input/GameButtonActionMap";
import { GameButtonDeviceInput } from "../framework/game/input/GameButtonDeviceInput";
import { GameLoader } from "../framework/game/level/GameLoader";
import { GameModel } from "../framework/game/model/GameModel";
import { GameVisualResources } from "../framework/game/rendering/GameVisualResources";

export class GameEnginePlugin implements ApplicationComponent {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: Application) {
    application.registerComponent(new GameEngine());

    application.registerComponent(new GameModel());

    application.registerComponent(new GameButtonActionMap());
    application.registerComponent(new GameButtonDeviceInput());
    application.registerComponent(new GameAxisDeviceInput());

    application.registerComponent(new GameLoader());
    application.registerComponent(new GameVisualResources());
  }
}
