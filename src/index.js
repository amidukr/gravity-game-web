import ReactDOM from "react-dom";

import React from "react";
import { GameWidget } from "./common/ui/GameWidget.js";

console.info(GameWidget);

ReactDOM.render(
  <div>
    <h1>Hello World</h1>
    <GameWidget name="Gravity Game" />
  </div>,
  document.body
);
