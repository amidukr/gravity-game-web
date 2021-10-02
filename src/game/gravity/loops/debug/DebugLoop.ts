import {
  ApplicationAutowireComponent,
  TYPE_ApplicationComponent,
} from "../../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../common/app/ApplicationContainer";
import { Introspection } from "../../../../common/app/lookup/Introspection";
import { GameEvent } from "../../../../common/framework/game/GameEvent";
import { GameLoop, TYPE_GameLoop } from "../../../../common/framework/game/looper/GameLoop";
import { DebugInfoModel } from "../../model/DebugInfoModel";

export class DebugLoop implements GameLoop, ApplicationAutowireComponent {
  debugModel!: DebugInfoModel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoop);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: ApplicationContainer): void {
    this.debugModel = application.getComponent(DebugInfoModel);
  }

  execute(event: GameEvent): void {
    this.debugModel.refreshView();
  }
}
