import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../app/api/ApplicationComponent";
import { Application } from "../app/Application";
import { Introspection } from "../app/lookup/Introspection";
import { GameEngine } from "../framework/game/GameEngine";
import { AxisUserInput } from "../framework/game/input/AxisUserInput";
import { MappedUserInput } from "../framework/game/input/MappedUserInput";
import { ButtonUserInput } from "../framework/game/input/ButtonUserInput";
import { CoreGameLoader } from "../framework/game/loader/core/CoreGameLoader";
import { GameModel } from "../framework/game/model/GameModel";
import { GameVisualResources } from "../framework/game/rendering/GameVisualResources";
import { GameLevel } from "../framework/game/level/GameLevel";

export class GameEnginePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: Application) {
    application.registerComponent(new GameEngine());

    application.registerComponent(new GameLevel());
    application.registerComponent(new GameModel());
    application.registerComponent(new GameVisualResources());

    application.registerComponent(new MappedUserInput());
    application.registerComponent(new ButtonUserInput());
    application.registerComponent(new AxisUserInput());

    application.registerComponent(new CoreGameLoader());
  }
}
