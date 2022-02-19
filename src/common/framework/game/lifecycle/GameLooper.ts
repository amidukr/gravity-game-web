import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { TypeIdentifier, typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { GameEvent } from "../GameEvent";

export const TYPE_GameLoop = typeIdentifier<GameLooper>("amid_ukr_ge_GameLoop");
export const TYPE_GameProcessingViewLoop = typeIdentifier<GameLooper>("amid_ukr_ge_GameProcessingViewLoop");
export const TYPE_GameRenderingViewLoop = typeIdentifier<GameLooper>("amid_ukr_ge_GameRenderingViewLoop");

export interface GameLooper {
  execute(event: GameEvent): void;
}

export abstract class GameProcessingViewLoop extends BaseGameLooper {
  override getLooperType = TYPE_GameProcessingViewLoop;
}

export abstract class GameProcessingViewLoop extends BaseGameLooper {
  override getLooperType = TYPE;
}

export abstract class BaseGameLooper implements GameLooper, ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, this.getGamelooperType());
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  abstract getLooperType: TypeIdentifier<GameLooper>;
  abstract autowire(application: ApplicationContainer): void;
  abstract execute(event: GameEvent): void;
}
