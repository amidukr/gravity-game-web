import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { GameLoaderModule, TYPE_GameLoaderModule } from "../loader/GameLoaderModule";
import { LoadGameObject } from "../loader/object/LoadGameObject";

export abstract class BaseGameModel<O> implements GameLoaderModule, ApplicationComponent {
  object!: O;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoaderModule);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  abstract construtNewObject(loadGameObject: LoadGameObject): O | Promise<O>;
  abstract autowire(application: ApplicationContainer): void;

  async startNewGame(loadGameObject: LoadGameObject): Promise<void> {
    this.object = await this.construtNewObject(loadGameObject);
  }
}
