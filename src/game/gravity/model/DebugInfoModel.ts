import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { LoadGameObject } from "../../../common/framework/game/loader/object/LoadGameObject";
import { BaseGameModel } from "../../../common/framework/game/model/BaseGameModel";

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
