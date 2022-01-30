import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { GameTimeLoop } from "./GameTimeLoop";
import { GameTimeModel } from "./GameTimeModel";

export class GameTimePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  setApplication(application: ApplicationContainer) {
    application.registerComponent(new GameTimeLoop());
    application.registerComponent(new GameTimeModel());
  }
}
