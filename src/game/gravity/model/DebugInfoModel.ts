import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BaseGameCoreModel } from "../../../common/game/engine/framework/GameModelTypes";

export class DebugInfoObject {
  altitude = 0;
}

export class DebugInfoModel extends BaseGameCoreModel<DebugInfoObject> {
  refreshViewCallback: ((object: DebugInfoObject) => void) | null = null;

  autowire(application: ApplicationContainer): void {}

  construtNewObject(): DebugInfoObject {
    return new DebugInfoObject();
  }

  refreshView() {
    if (this.refreshViewCallback) {
      this.refreshViewCallback(this.object);
    }
  }
}
