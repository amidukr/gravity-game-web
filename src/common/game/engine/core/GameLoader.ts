import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../package";

export const TYPE_GameStarter = typeIdentifier<GameLoader>("GameStarter", PACKAGE_AmidGeFramework);

export interface GameLoader {
  startNewGame(): void | Promise<void>;
}

export abstract class BaseGameLoader implements GameLoader, ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameStarter, {
      executionOrder: this.executionOrder(),
    });
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  abstract executionOrder(): number;
  abstract autowire(application: ApplicationContainer): void;
  abstract startNewGame(): void;
}
