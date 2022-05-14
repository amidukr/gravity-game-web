import { ApplicationComponent, TYPE_ApplicationComponent } from "../api/ApplicationComponent";
import { Introspection } from "../lookup/Introspection";

export class BaseApplicationComponent implements ApplicationComponent {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }
}
