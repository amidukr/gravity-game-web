import { Application } from "../app/Application";
import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";

declare global {
  interface Window {
    application: Application;
  }
}

export class ApplicationWindowVariablePlugin {
  constructor() {
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  register(application: Application) {
    window.application = application;
  }
}
