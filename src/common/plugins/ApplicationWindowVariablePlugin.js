import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";

export class ApplicationWindowVariablePlugin {
  constructor() {
    ApplicationComponentMeta.bindComponentFunctionToGlobal(this);
  }

  registerPluginComponents(application) {
    window.application = application;
  }
}
