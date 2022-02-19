import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { LoadGameObject } from "../../../common/game/engine/features/loader/object/LoadGameObject";
import { BaseGameViewModel } from "../../../common/game/engine/framework/GameModelTypes";

export class DebugInfoObject {
  altitude = 0;
}

export class DebugInfoModel extends BaseGameViewModel<DebugInfoObject> {
  refreshViewCallback: ((object: DebugInfoObject) => void) | null = null;

  autowire(application: ApplicationContainer): void {}

  construtNewObject(loadGameObject: LoadGameObject): DebugInfoObject {
    return new DebugInfoObject();
  }

  refreshView() {
    if (this.refreshViewCallback) {
      this.refreshViewCallback(this.object);
    }
  }
}
