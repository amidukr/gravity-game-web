import "core-js/stable";
import "regenerator-runtime/runtime";
import { ApplicationContainer } from "./common/app/ApplicationContainer";
import { GravityGamePlugin } from "./game/gravity/plugins/GravityGamePlugin";
import "./index.css";

async function main() {
  const application = new ApplicationContainer();

  application.registerComponent(new GravityGamePlugin());

  await application.start();
}

main();
