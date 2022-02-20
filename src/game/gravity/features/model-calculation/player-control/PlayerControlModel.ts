import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseGameStateModel } from "../../../../../common/game/engine/framework/GameModelTypes";

export class PlayerControl {
  mouseNavigationEanbledAt: number = 0;
}

export class PlayerControlModel extends BaseGameStateModel<PlayerControl> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(): PlayerControl {
    return new PlayerControl();
  }
}
