import "core-js/stable";
import "regenerator-runtime/runtime";
import { Application } from "./common/app/Application";
import { GravityGameEnginePlugin } from "./game/gravity/plugins/GravityGamePlugin";
import "./index.css";

async function main() {
  const application = new Application();

  application.registerComponent(new GravityGameEnginePlugin());

  await application.start();
}

main();
