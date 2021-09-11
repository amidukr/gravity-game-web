import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { GameLoaderModule, TYPE_GameLoaderModule } from "./GameLoaderModule";
import { LoadGameObject } from "./object/LoadGameObject";

export class GameLoader implements ApplicationComponent {
  modules!: GameLoaderModule[];

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: ApplicationContainer) {
    this.modules = application.getComponentList(TYPE_GameLoaderModule);
  }

  async loadGame(loadGameObject: LoadGameObject) {
    for (const loader of this.modules) {
      await loader.startNewGame(loadGameObject);
    }
  }
}
