import React from "react";
import PropTypes from "prop-types";

export class GameWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    application: PropTypes.object,
  };

  __setCanvasPlaceholder(canvasPlaceholder) {
    const canvasDomElement = this.props.application
      .getComponent("GameRenderer")
      .getCanvasDomElement();

    canvasPlaceholder.appendChild(canvasDomElement);
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
