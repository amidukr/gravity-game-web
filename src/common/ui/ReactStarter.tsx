import ReactDOM from "react-dom";
import React from "react";
import { GameWidget } from "./GameWidget";
import { Application } from "../app/Application";
import { ApplicationComponentMeta } from "../app/lookup/ApplicationComponentMeta";
import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../app/api/ApplicationComponent";
import { typeIdentifier } from "../app/lookup/TypeIdentifier";

export const TYPE_ReactRootWidget = typeIdentifier<any>(
  "amid_ukr_ge_ReactRootWidget"
);

export class ReactStarter implements ApplicationComponent {
  private __reactRootWidget: any;

  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
    this.__reactRootWidget = application.getComponent(TYPE_ReactRootWidget);
  }

  start(application: Application): void {
    var divRootElement = document.createElement("div");
    divRootElement.id = "root";

    document.body.appendChild(divRootElement);

    ReactDOM.render(
      <this.__reactRootWidget application={application} />,
      divRootElement
    );
  }
}
