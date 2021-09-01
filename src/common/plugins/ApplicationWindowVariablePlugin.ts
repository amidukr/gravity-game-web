import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../app/api/ApplicationComponent";
import { Application } from "../app/Application";
import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";

declare global {
  interface Window {
    application: Application;
  }
}

export class ApplicationWindowVariablePlugin implements ApplicationComponent {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName<ApplicationComponent>(
      this,
      TYPE_ApplicationComponent
    );
  }

  register(application: Application) {
    window.application = application;
  }
}
