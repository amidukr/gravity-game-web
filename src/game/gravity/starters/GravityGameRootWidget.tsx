import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GameWidget } from "../../../common/ui/GameWidget";
import ReactDOM from "react-dom";
import React from "react";

export class GravityGameRootWidget implements ApplicationComponent {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  start(application: Application): void {
    var divRootElement = document.createElement("div");
    divRootElement.id = "root";

    document.body.appendChild(divRootElement);

    ReactDOM.render(<GameWidget application={application} />, divRootElement);
  }
}
