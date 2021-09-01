import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../app/api/ApplicationComponent";
import { Application } from "../app/Application";
import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";
import { GameLoader } from "../framework/game/level/GameLoader";
import { GameEnginePlugin } from "./GameEnginePlugin";
import { GameInputApplicationPlugin } from "./GameInputApplicationPlugin";

export class GameBootstrapPlugin implements ApplicationComponent {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: Application) {
    application.registerComponent(new GameInputApplicationPlugin());
    application.registerComponent(new GameEnginePlugin());
    application.registerComponent(new GameLoader());
  }
}
