import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { Introspection } from "../../../../app/lookup/Introspection";
import { InputButton } from "../../features/input/types/InputButton";
import { GameViewButtonHandler, TYPE_GameViewButtonHandler } from "./GameViewButtonHandler";

export abstract class BaseGameViewButtonHandler implements ApplicationComponent, GameViewButtonHandler {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameViewButtonHandler);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  abstract autowire?(application: ApplicationContainer): void;
  abstract keyPressed(button: InputButton): void;
}
