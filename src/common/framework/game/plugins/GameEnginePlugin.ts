import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { Application } from "../../../app/Application";
import { Introspection } from "../../../app/lookup/Introspection";
import { GameEngine } from "../GameEngine";
import { CoreGameLoader } from "../loader/core/CoreGameLoader";
import { GameModel } from "../model/GameModel";
import { GameVisualResources } from "../rendering/GameVisualResources";
import { GameLevel } from "../level/GameLevel";
import { GameViewCollection } from "../ui/view/GameViewsCollection";
import { AxisUserInput } from "../input/AxisUserInput";
import { MappedUserInput } from "../input/MappedUserInput";

export class GameEnginePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: Application) {
    application.registerComponent(new GameEngine());

    application.registerComponent(new GameLevel());
    application.registerComponent(new GameModel());
    application.registerComponent(new GameVisualResources());
    application.registerComponent(new GameViewCollection());

    application.registerComponent(new MappedUserInput());

    application.registerComponent(new CoreGameLoader());
  }
}
