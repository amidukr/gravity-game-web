import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { typeIdentifier } from "../../../app/lookup/TypeIdentifierUtils";
import { PACKAGE_AmidGeFramework } from "../../../package";

export const TYPE_GameLoader = typeIdentifier<GameLoader>("GameLoader", PACKAGE_AmidGeFramework);

export interface GameLoader {
  startNewGame(): void;
}

export abstract class BaseGameLoader implements GameLoader, ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoader, {
      executionOrder: this.executionOrder(),
    });
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  abstract executionOrder(): number;
  abstract autowire(application: ApplicationContainer): void;
  abstract startNewGame(): void;
}
