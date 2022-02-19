import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { ApplicationWindowVariablePlugin } from "../../../plugins/ApplicationWindowVariablePlugin";
import { MappedUserInput } from "../features/input/MappedUserInput";
import { GameLevel } from "../features/level/GameLevel";
import { RepositoryGameLevelLoader } from "../features/level/RepositoryGameLevelLoader";
import { LoadGameArgumentsModel } from "../features/loader/LoadGameArgumentsModel";
import { GameTimePlugin } from "../features/time/GameTimePlugin";
import { GameEngine } from "../GameEngine";
import { GameViewCollection } from "../ui/view/GameViewsCollection";

export class GameEnginePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: ApplicationContainer) {
    application.registerComponent(new ApplicationWindowVariablePlugin());

    application.registerComponent(new GameEngine());
    application.registerComponent(new GameTimePlugin());

    application.registerComponent(new GameLevel());
    application.registerComponent(new GameViewCollection());

    application.registerComponent(new MappedUserInput());

    application.registerComponent(new LoadGameArgumentsModel());
    application.registerComponent(new GameLevel());
    application.registerComponent(new RepositoryGameLevelLoader());
  }
}
