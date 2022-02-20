import { BaseGameCoreState } from "../../../../../common/game/engine/framework/GameModelTypes";

export class DebugInfoObject {
  altitude = 0;
}

export class DebugInfoModel extends BaseGameCoreState<DebugInfoObject> {
  refreshViewCallback: ((object: DebugInfoObject) => void) | null = null;

  construtNewObject(): DebugInfoObject {
    return new DebugInfoObject();
  }

  refreshView() {
    if (this.refreshViewCallback) {
      this.refreshViewCallback(this.object);
    }
  }
}
