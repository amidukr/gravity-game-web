import "core-js/stable";
import "regenerator-runtime/runtime";

import ReactDOM from "react-dom";

import React from "react";
import { GameWidget } from "./common/ui/GameWidget";

import { Application } from "./common/app/Application";

import "./index.css";
import { GravityGameEnginePlugin } from "./game/gravity/plugins/GravityGamePlugin";
import { GameEngine } from "./common/framework/game/GameEngine";
import { GravityGameLoader } from "./game/gravity/level/GravityGameLoader";

function createRootWidget(application: Application) {
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

async function startGame(application: Application) {
  const gameLoader = application.getComponent(GravityGameLoader);
  const gameEngine = application.getComponent(GameEngine);

  await gameLoader.loadGame({ levelName: "demo" });
  gameEngine.start();
}

async function main() {
  const application = await createApplication();
  createRootWidget(application);
  startGame(application);
}

main();
