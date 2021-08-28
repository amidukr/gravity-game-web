import React from "react";
import PropTypes from "prop-types";
import { Application } from "../app/Application";

export class GameWidget extends React.Component<
  { application: Application },
  any
> {
  constructor(props: any) {
    super(props);
  }

  static propTypes = {
    application: PropTypes.object,
  };

  __setCanvasPlaceholder(canvasPlaceholder: HTMLElement | null) {
    const render: GameRenderer =
      this.props.application.getComponent("GameRenderer");

    const canvasDomElement = render.getCanvasDomElement();

    if (canvasPlaceholder != null) {
      canvasPlaceholder.appendChild(canvasDomElement);
    }
  }

  render() {
    return (
      <div
        ref={this.__setCanvasPlaceholder.bind(this)}
        style={{ display: "inline" }}
      ></div>
    );
  }
}
