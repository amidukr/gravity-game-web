import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../app/api/ApplicationComponent";
import { Application } from "../app/Application";
import { Introspection } from "../app/lookup/Introspection";

declare global {
  interface Window {
    application: Application;
  }
}

export class ApplicationWindowVariablePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  register(application: Application) {
    window.application = application;
  }
}
