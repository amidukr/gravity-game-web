import React from "react";
import PropTypes from "prop-types";

export class GameWidget extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

GameWidget.propTypes = {
  name: PropTypes.string.isRequired,
};
