import React from "react";
import PropTypes from "prop-types";
import { TYPE_GameRenderer } from "../../rendering/GameRenderer";
import { AxisUserInput } from "../../input/AxisUserInput";
import { MouseDevice } from "../../input/devices/MouseDevice";
import { GameView } from "../../ui/view/GameView";
import { GameViewCollection } from "../../ui/view/GameViewsCollection";

export interface GameViewWidgetProps {
  gameView: GameView;
}

export class GameViewWidget extends React.Component<GameViewWidgetProps, any> {
  private gameView!: GameView;
  private gameViewCollection!: GameViewCollection;
  private canvas!: HTMLCanvasElement;

  constructor(props: GameViewWidgetProps) {
    super(props);
    this.state = { label: "" };

    this.gameView = props.gameView;

    this.gameViewCollection =
      this.gameView.application.getComponent(GameViewCollection);

    const renderer = this.gameView.application.getComponent(TYPE_GameRenderer);

    if (this.gameView.exclusiveRenderingCanvas) {
      this.canvas = renderer.getCanvasDomElement();
    } else {
      this.canvas = document.createElement("canvas");
    }

    this.gameView.canvas = this.canvas;

    this.updateMouseCoordinate(1, 1, 2, 2);
  }

  static propTypes = {
    application: PropTypes.object,
  };

  override componentDidMount() {
    this.gameViewCollection.bindView(this.gameView);
  }

  override componentWillUnmount() {
    this.gameViewCollection.unbindView(this.gameView);
  }

  setCanvasPlaceholder(canvasPlaceholder: HTMLElement | null) {
    const canvasDomElement = this.gameView.canvas;

    if (canvasPlaceholder && canvasDomElement) {
      canvasPlaceholder.appendChild(canvasDomElement);
    }
  }

  private updateMouseCoordinate(
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const axisInput = this.gameView.axisUserInput;

    axisInput.setCoordinate(MouseDevice.ABSOLUTE_X, x);
    axisInput.setCoordinate(MouseDevice.ABSOLUTE_Y, y);

    axisInput.setCoordinate(MouseDevice.RELATIVE_X, x / width);
    axisInput.setCoordinate(MouseDevice.RELATIVE_Y, 1 - y / height);
  }

  private handleMouseMove(ev: any) {
    this.updateMouseCoordinate(
      ev.clientX,
      ev.clientY,
      ev.target.clientWidth,
      ev.target.clientHeight
    );
  }

  override render() {
    return (
      <div
        ref={this.setCanvasPlaceholder.bind(this)}
        style={{ display: "inline" }}
        onMouseMove={this.handleMouseMove.bind(this)}
      >
        <div style={{ position: "absolute", color: "white" }}>
          <span>{this.state.label}</span>
        </div>
      </div>
    );
  }
}
