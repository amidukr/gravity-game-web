import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BaseGameModel } from "../../../common/game/engine/core/interface/GameModel";
import { LoadGameObject } from "../../../common/game/engine/features/loader/object/LoadGameObject";

export class DebugInfoObject {
  altitude = 0;
}

export class DebugInfoModel extends BaseGameModel<DebugInfoObject> {
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
