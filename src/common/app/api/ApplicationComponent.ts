import { ApplicationContainer } from "../ApplicationContainer";
import { typeIdentifier } from "../lookup/TypeIdentifier";

export const TYPE_ApplicationComponent = typeIdentifier<ApplicationComponent>("amid_ukr_app_ApplicationComponent");

export interface ApplicationComponent {
  setApplication?(application: ApplicationContainer): void;
  register?(application: ApplicationContainer): Promise<void> | void;
  autowire?(application: ApplicationContainer): void;
  start?(application: ApplicationContainer): Promise<void> | void;
  onApplicationStarted?(application: ApplicationContainer): void;
}

export interface ApplicationAutowireComponent extends ApplicationComponent {
  autowire(application: ApplicationContainer): void;
}
