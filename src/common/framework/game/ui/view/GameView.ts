import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { AxisUserInput } from "../../input/AxisUserInput";
import { ButtonUserInput } from "../../input/ButtonUserInput";
import { GameViewButtonHandler } from "./GameViewButtonHandler";
import { GameViewLoop } from "./GameViewLoop";

export interface GameViewParameters {
  readonly exclusiveRenderingCanvas?: Boolean;
  readonly application: ApplicationContainer;
  readonly processingLoops?: GameViewLoop[];
  readonly renderingLoops?: GameViewLoop[];
  readonly buttonHandlers?: GameViewButtonHandler[];
}

export class GameView {
  readonly axisUserInput: AxisUserInput = new AxisUserInput();
  readonly buttonUserInput: ButtonUserInput = new ButtonUserInput();
  canvas!: HTMLCanvasElement;

  readonly exclusiveRenderingCanvas: Boolean;
  readonly application: ApplicationContainer;
  readonly processingLoops: GameViewLoop[];
  readonly renderingLoops: GameViewLoop[];
  readonly buttonHandlerCollection: GameViewButtonHandler[];

  constructor(private parameters: GameViewParameters) {
    const exclusiveRenderingCanvas = this.parameters.exclusiveRenderingCanvas;

    this.exclusiveRenderingCanvas = exclusiveRenderingCanvas == undefined || exclusiveRenderingCanvas;
    this.application = parameters.application;
    this.processingLoops = parameters.processingLoops || [];
    this.renderingLoops = parameters.renderingLoops || [];
    this.buttonHandlerCollection = parameters.buttonHandlers || [];
  }
}
