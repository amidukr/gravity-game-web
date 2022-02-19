import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";

export const TYPE_GameRenderer = typeIdentifier<GameRenderer>("amid_ukr_ge_GameRenderer");

export interface GameRenderer {
  getCanvasDomElement(): HTMLCanvasElement;
}
