import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";
import { InputButton } from "../../input/types/InputButton";

export const TYPE_GameViewButtonHandler = typeIdentifier<GameViewButtonHandler>("amid_ukr_ge_GameViewButtonHandler");

export interface GameViewButtonHandler {
  keyPressed(button: InputButton): void;
}
