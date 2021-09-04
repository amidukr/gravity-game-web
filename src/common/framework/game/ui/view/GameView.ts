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

  constructor(private parameters: GameViewParameters) {}

  get exclusiveRenderingCanvas(): Boolean {
    const exclusiveRenderingCanvas = this.parameters.exclusiveRenderingCanvas;

    if (exclusiveRenderingCanvas == undefined) {
      return true;
    } else {
      return exclusiveRenderingCanvas;
    }
  }

  get application(): Application {
    return this.parameters.application;
  }
  get processingLoops(): GameViewLoop[] {
    return this.parameters.processingLoops;
  }
  get renderingLoops(): GameViewLoop[] {
    return this.parameters.renderingLoops;
  }
}
