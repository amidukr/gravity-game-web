import "core-js/stable";
import "regenerator-runtime/runtime";

import { Application } from "./common/app/Application";

import "./index.css";
import { GravityGameEnginePlugin } from "./game/gravity/plugins/GravityGamePlugin";

async function main() {
  const application = new Application();

  application.registerComponent(new GravityGameEnginePlugin());

  await application.start();
}

main();
