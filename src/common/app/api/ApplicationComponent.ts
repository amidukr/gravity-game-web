import { Application } from "../Application";
import { typeIdentifier } from "../lookup/TypeIdentifier";

export const TYPE_ApplicationComponent = typeIdentifier<ApplicationComponent>(
  "amid_ukr_app_ApplicationComponent"
);

export interface ApplicationComponent {
  setApplication?(application: Application): void;
  register?(application: Application): void;
  autowire?(application: Application): void;
  start?(application: Application): void;
  onApplicationStarted?(application: Application): void;
}
