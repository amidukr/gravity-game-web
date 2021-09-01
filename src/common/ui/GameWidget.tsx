import React from "react";
import PropTypes from "prop-types";
import { Application } from "../app/Application";
import {
  GameRenderer,
  TYPE_GameRenderer,
} from "../framework/game/rendering/GameRenderer";

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
      this.props.application.getComponent(TYPE_GameRenderer);

    const canvasDomElement = render.getCanvasDomElement();

    if (canvasPlaceholder != null) {
      canvasPlaceholder.appendChild(canvasDomElement);
    }
  }

  override render() {
    return (
      <div
        ref={this.__setCanvasPlaceholder.bind(this)}
        style={{ display: "inline" }}
      ></div>
    );
  }
}
