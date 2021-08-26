import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";

export class ApplicationWindowVariablePlugin {
  constructor() {
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  register(application) {
    window.application = application;
  }
}
