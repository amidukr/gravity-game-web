import { ApplicationContainer } from "../ApplicationContainer";
import { BaseApplicationComponent } from "./BaseApplicationComponent";

export abstract class BasePlugin extends BaseApplicationComponent {
  abstract registerComponents(application: ApplicationContainer): void;

  setApplication(application: ApplicationContainer): void {
    this.registerComponents(application);
  }
}
