import { ApplicationGlobalFunctions } from "../app/lookup/ApplicationGlobalFunctions";

export class ApplicationWindowVariablePlugin {
  constructor() {
    ApplicationGlobalFunctions.registerFunction(
      this,
      function registerPluginComponents(application) {
        window.application = application;
      }
    );
  }
}
