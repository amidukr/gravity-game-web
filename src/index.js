import "core-js/stable";
import "regenerator-runtime/runtime";

import ReactDOM from "react-dom";

import React from "react";
import { GameWidget } from "./common/ui/GameWidget";

import { Application } from "./common/app/Application.js";

import "./index.css";
import { GravityGameEnginePlugin } from "./game/gravity/plugins/GravityGamePlugin";

function createRootWidget(application) {
  var divRootElement = document.createElement("div");
  divRootElement.id = "root";

  document.body.appendChild(divRootElement);

  ReactDOM.render(<GameWidget application={application} />, divRootElement);
}

async function createApplication() {
  const application = new Application();

  application.registerComponent(new GravityGameEnginePlugin());

  await application.start();

  return application;
}

async function startGame(application) {
  const gameLoader = application.getComponent("GameLoader");
  const gameEngine = application.getComponent("GameEngine");

  await gameLoader.loadGame({ levelName: "Planet System3.glb" });
  gameEngine.start();
}

async function main() {
  const application = await createApplication();
  createRootWidget(application);
  startGame(application);
}

main();
