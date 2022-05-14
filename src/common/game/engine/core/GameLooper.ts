import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { TypeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { LifecycleStage } from "../../../app/utils/LifecycleStage";
import { GameLoaderExecutionOrder } from "../framework/GameLoaderTypes";
import { GameEvent } from "../GameEvent";
import { GameLoader, TYPE_GameStarter } from "./GameLoader";

export interface GameLooper {
  executionOrder(): LifecycleStage;
  execute(event: GameEvent): void;
}

export abstract class BaseGameLooper implements GameLooper, GameLoader, ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, this.looperType(), {
      executionOrder: this.executionOrder().getOrderIndex(),
    });

    Introspection.bindInterfaceName(this, TYPE_GameStarter, {
      executionOrder: GameLoaderExecutionOrder.GameLooperStarter.getOrderIndex(),
    });

    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  startNewGame(): void | Promise<void> {}
  abstract executionOrder(): LifecycleStage;

  abstract looperType(): TypeIdentifier<GameLooper>;
  abstract autowire(application: ApplicationContainer): void;
  abstract execute(event: GameEvent): void;
}
