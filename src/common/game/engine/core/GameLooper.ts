import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../package";
import { GameLoaderExecutionOrder } from "../framework/GameLoaderTypes";
import { GameEvent } from "../GameEvent";
import { GameStarter, TYPE_GameStarter } from "./GameLoader";

export const TYPE_GameLooper = typeIdentifier<GameLooper>("GameLooper", PACKAGE_AmidGeFramework);

export interface GameLooper {
  execute(event: GameEvent): void;
}

export abstract class BaseGameLooper implements GameLooper, GameStarter, ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLooper, {
      executionOrder: this.executionOrder(),
    });

    Introspection.bindInterfaceName(this, TYPE_GameStarter, {
      executionOrder: GameLoaderExecutionOrder.GameLooperStarter,
    });

    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }
  
  startNewGame(): void | Promise<void> {}
  abstract executionOrder(): number;
  abstract autowire(application: ApplicationContainer): void;
  abstract execute(event: GameEvent): void;
}
