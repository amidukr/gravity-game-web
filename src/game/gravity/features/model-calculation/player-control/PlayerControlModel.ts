import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseGameModel } from "../../../../../common/game/engine/framework/GameModelTypes";

export class PlayerControl {
  mouseNavigationEanbledAt: number = 0;
}

export class PlayerControlModel extends BaseGameModel<PlayerControl> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(): PlayerControl {
    return new PlayerControl();
  }
}
