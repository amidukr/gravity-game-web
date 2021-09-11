import React from "react";
import ReactDOM from "react-dom";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../app/api/ApplicationComponent";
import { ApplicationContainer } from "../app/ApplicationContainer";
import { Introspection } from "../app/lookup/Introspection";
import { typeIdentifier } from "../app/lookup/TypeIdentifier";

export const TYPE_ReactRootWidget = typeIdentifier<any>("amid_ukr_ge_ReactRootWidget");

export class ReactStarter implements ApplicationComponent {
  private __reactRootWidget: any;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: ApplicationContainer) {
    this.__reactRootWidget = application.getComponent(TYPE_ReactRootWidget);
  }

  start(application: ApplicationContainer): void {
    var divRootElement = document.createElement("div");
    divRootElement.id = "root";

    document.body.appendChild(divRootElement);

    ReactDOM.render(<this.__reactRootWidget application={application} />, divRootElement);
  }
}
