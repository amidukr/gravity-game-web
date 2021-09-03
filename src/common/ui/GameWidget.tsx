import React from "react";
import PropTypes from "prop-types";
import { Application } from "../app/Application";
import {
  GameRenderer,
  TYPE_GameRenderer,
} from "../framework/game/rendering/GameRenderer";
import { AxisUserInput } from "../framework/game/input/AxisUserInput";
import { MouseDevice } from "../framework/game/input/devices/MouseDevice";

export class GameWidget extends React.Component<
  { application: Application },
  any
> {
  private renderer!: GameRenderer;
  private axisInput!: AxisUserInput;

  constructor(props: any) {
    super(props);
    this.state = { label: "" };

    this.renderer = this.props.application.getComponent(TYPE_GameRenderer);
    this.axisInput = this.props.application.getComponent(AxisUserInput);

    this.renderer
      .getCanvasDomElement()
      .addEventListener("mousemove", this.handleMouseMove.bind(this));

    const canvasElement = this.renderer.getCanvasDomElement();

    this.updateMouseCoordinate(1, 1, 2, 2);
  }

  static propTypes = {
    application: PropTypes.object,
  };

  setCanvasPlaceholder(canvasPlaceholder: HTMLElement | null) {
    const canvasDomElement = this.renderer.getCanvasDomElement();

    if (canvasPlaceholder != null) {
      canvasPlaceholder.appendChild(canvasDomElement);
    }
  }

  private updateMouseCoordinate(
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.axisInput.setCoordinate(MouseDevice.ABSOLUTE_X, x);
    this.axisInput.setCoordinate(MouseDevice.ABSOLUTE_Y, y);

    this.axisInput.setCoordinate(MouseDevice.RELATIVE_X, x / width);
    this.axisInput.setCoordinate(MouseDevice.RELATIVE_Y, 1 - y / height);
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
      >
        <div style={{ position: "absolute", color: "white" }}>
          <span>{this.state.label}</span>
        </div>
      </div>
    );
  }
}
