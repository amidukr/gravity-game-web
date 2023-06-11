import "core-js/stable";
import "reflect-metadata";
import "regenerator-runtime/runtime";
import { ApplicationContainer } from "./common/app/ApplicationContainer";
import { GravityGamePlugin } from "./game/gravity/plugins/GravityGamePlugin";
import "./index.css";

async function main() {
  const application = new ApplicationContainer();

  application.registerComponent(new GravityGamePlugin());

  await application.start();
}

console.error('Fix hack: if(gravityFieldObject.name == "TagGravityFieldSun") { ');
console.error("Fix hack: return GRAVITY_CONSTANT * gravityObject.mass / (l * l) / 400;");

main();
