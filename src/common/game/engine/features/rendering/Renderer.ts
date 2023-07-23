import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";

export const TYPE_Renderer = typeIdentifier<Renderer>("amid_ukr_ge_GameRenderer");

export interface Renderer {
  getCanvasDomElement(): HTMLCanvasElement;
}
