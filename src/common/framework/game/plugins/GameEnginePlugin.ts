import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { Application } from "../../../app/Application";
import { Introspection } from "../../../app/lookup/Introspection";
import { GameEngine } from "../GameEngine";
import { MappedUserInput } from "../input/MappedUserInput";
import { GameLevel } from "../level/GameLevel";
import { CoreGameLoader } from "../loader/core/CoreGameLoader";
import { GameModel } from "../model/GameModel";
import { GameVisualResources } from "../rendering/GameVisualResources";
import { GameViewCollection } from "../ui/view/GameViewsCollection";

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
