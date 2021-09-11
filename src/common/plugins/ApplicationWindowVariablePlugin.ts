import { ApplicationComponent, TYPE_ApplicationComponent } from "../app/api/ApplicationComponent";
import { ApplicationContainer } from "../app/ApplicationContainer";
import { Introspection } from "../app/lookup/Introspection";

declare global {
  interface Window {
    application: ApplicationContainer;
  }
}

export class ApplicationWindowVariablePlugin implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  register(application: ApplicationContainer) {
    window.application = application;
  }
}
