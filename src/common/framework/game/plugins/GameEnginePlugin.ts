import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { ApplicationWindowVariablePlugin } from "../../../plugins/ApplicationWindowVariablePlugin";
import { GameEngine } from "../GameEngine";
import { MappedUserInput } from "../input/MappedUserInput";
import { GameLevel } from "../level/GameLevel";
import { GameLoader } from "../loader/GameLoader";
import { AutowiredLoopersModule } from "../loader/modules/AutowiredLoopersModule";
import { LoadGameLevelModule } from "../loader/modules/LoadGameLevelModule";
import { GameViewCollection } from "../ui/view/GameViewsCollection";

export class GameEnginePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: ApplicationContainer) {
    application.registerComponent(new ApplicationWindowVariablePlugin());

    application.registerComponent(new GameEngine());

    application.registerComponent(new GameLevel());
    application.registerComponent(new GameViewCollection());

    application.registerComponent(new MappedUserInput());

    application.registerComponent(new GameLoader());

    application.registerComponent(new AutowiredLoopersModule());
    application.registerComponent(new LoadGameLevelModule());
  }
}
