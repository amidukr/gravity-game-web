import "core-js/stable";
import "regenerator-runtime/runtime";

import ReactDOM from "react-dom";

import React from "react";
import { GameWidget } from "./common/ui/GameWidget";

import { Application } from "./common/app/Application.js";

import { GameInputApplicationPlugin } from "./common/plugins/GameInputApplicationPlugin";
import { ApplicationWindowVariablePlugin } from "./common/plugins/ApplicationWindowVariablePlugin";

import "./index.css";

function createRootWidget() {
  var divRootElement = document.createElement("div");
  divRootElement.id = "root";

  document.body.appendChild(divRootElement);

  ReactDOM.render(<GameWidget />, divRootElement);
}

async function createApplication() {
  const application = new Application();

  application.registerComponent(new GameInputApplicationPlugin());
  application.registerComponent(new ApplicationWindowVariablePlugin());

  await application.start();
}

async function main() {
  createRootWidget();
  await createApplication();
}

main();
