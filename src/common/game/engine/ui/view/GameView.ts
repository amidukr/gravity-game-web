import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { Introspection } from "../../../../app/lookup/Introspection";
import { AxisUserInput } from "../../features/input/AxisUserInput";
import { ButtonUserInput } from "../../features/input/ButtonUserInput";

export interface GameViewParameters {
  readonly exclusiveRenderingCanvas?: Boolean;
  readonly container: ApplicationContainer;
}

export class GameView {
  canvas!: HTMLCanvasElement;
  readonly container: ApplicationContainer;
  readonly exclusiveRenderingCanvas: Boolean;

  constructor(private parameters: GameViewParameters) {
    Introspection.bindInterfaceName(this, GameView);

    const exclusiveRenderingCanvas = this.parameters.exclusiveRenderingCanvas;
    this.exclusiveRenderingCanvas = exclusiveRenderingCanvas == undefined || exclusiveRenderingCanvas;
    this.container = parameters.container;

    this.container.registerComponent(this);
    this.container.registerComponent(new AxisUserInput());
    this.container.registerComponent(new ButtonUserInput());
  }
}
