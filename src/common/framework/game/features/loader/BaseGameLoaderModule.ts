import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { Introspection } from "../../../../app/lookup/Introspection";
import { GameLoaderModule, TYPE_GameLoaderModule } from "./GameLoaderModule";
import { LoadGameObject } from "./object/LoadGameObject";

export abstract class BaseGameLoaderModule implements GameLoaderModule, ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoaderModule);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  abstract autowire(application: ApplicationContainer): void;
  abstract startNewGame(loadGameObject: LoadGameObject): void | Promise<void>;
}
