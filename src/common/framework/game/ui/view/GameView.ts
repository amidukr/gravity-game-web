import { Application } from "../../../../app/Application";
import { AxisUserInput } from "../../input/AxisUserInput";
import { ButtonUserInput } from "../../input/ButtonUserInput";
import { GameViewLoop } from "./GameViewLoop";

export interface GameViewParameters {
  readonly exclusiveRenderingCanvas?: Boolean;
  readonly application: Application;
  readonly processingLoops: GameViewLoop[];
  readonly renderingLoops: GameViewLoop[];
}

export class GameView {
  readonly axisUserInput: AxisUserInput = new AxisUserInput();
  readonly buttonUserInput: ButtonUserInput = new ButtonUserInput();
  canvas!: HTMLCanvasElement;

  readonly exclusiveRenderingCanvas: Boolean;
  readonly application: Application;
  readonly processingLoops: GameViewLoop[];
  readonly renderingLoops: GameViewLoop[];

  constructor(private parameters: GameViewParameters) {
    const exclusiveRenderingCanvas = this.parameters.exclusiveRenderingCanvas;

    this.exclusiveRenderingCanvas = exclusiveRenderingCanvas == undefined || exclusiveRenderingCanvas;
    this.application = parameters.application;
    this.processingLoops = parameters.processingLoops;
    this.renderingLoops = parameters.renderingLoops;
  }
}
