import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { typeIdentifier } from "../../../app/lookup/TypeIdentifierUtils";
import { PACKAGE_AmidGeFramework } from "../../../package";
import { GameEvent } from "../GameEvent";

export const TYPE_GameLooper = typeIdentifier<GameLooper>("GameLooper", PACKAGE_AmidGeFramework);

export interface GameLooper {
  execute(event: GameEvent): void;
}

export abstract class BaseGameLooper implements GameLooper, ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLooper, {
      executionOrder: this.executionOrder(),
    });
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  abstract executionOrder(): number;
  abstract autowire(application: ApplicationContainer): void;
  abstract execute(event: GameEvent): void;
}
