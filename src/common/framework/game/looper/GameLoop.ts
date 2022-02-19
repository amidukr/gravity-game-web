import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { Introspection } from "../../../app/lookup/Introspection";
import { TypeIdentifier, typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { GameEvent } from "../GameEvent";

export const TYPE_GameLoop = typeIdentifier<GameLoop>("amid_ukr_ge_GameLoop");
export const TYPE_GameProcessingViewLoop = typeIdentifier<GameLoop>("amid_ukr_ge_GameProcessingViewLoop");
export const TYPE_GameRenderingViewLoop = typeIdentifier<GameLoop>("amid_ukr_ge_GameRenderingViewLoop");

export interface GameLoop {
  execute(event: GameEvent): void;
}

export abstract class BaseGameLoop implements GameLoop, ApplicationComponent {
  constructor(gameLoopType: TypeIdentifier<GameLoop>) {
    Introspection.bindInterfaceName(this, gameLoopType);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  abstract autowire(application: ApplicationContainer): void;
  abstract execute(event: GameEvent): void;
}
