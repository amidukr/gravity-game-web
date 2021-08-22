import "core-js/stable";
import "regenerator-runtime/runtime";

import ReactDOM from "react-dom";

import React from "react";
import { GameWidget } from "./common/ui/GameWidget";

import "./index.css";

console.info(GameWidget);

var divRootElement = document.createElement("div");
divRootElement.id = "root";

document.body.appendChild(divRootElement);

ReactDOM.render(<GameWidget />, divRootElement);
