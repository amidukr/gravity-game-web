import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseGameRenderingLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";
import { DebugInfoModel } from "./DebugInfoModel";

export class DebugLoop extends BaseGameRenderingLooper {
  debugModel!: DebugInfoModel;

  autowire(application: ApplicationContainer): void {
    this.debugModel = application.getComponent(DebugInfoModel);
  }

  execute(event: GameEvent): void {
    this.debugModel.refreshView();
  }
}
