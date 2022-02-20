import { BaseGameModel } from "../../../../../common/game/engine/framework/GameModelTypes";

export class PlayerControl {
  mouseNavigationEanbledAt: number = 0;
}

export class PlayerControlModel extends BaseGameModel<PlayerControl> {
  construtNewObject(): PlayerControl {
    return new PlayerControl();
  }
}
