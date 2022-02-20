import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BaseGameStateModel } from "../../../common/game/engine/framework/GameModelTypes";

export class PlayerView {
  mouseNavigationEanbledAt: number = 0;
}

export class PlayerViewModel extends BaseGameStateModel<PlayerView> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(): PlayerView {
    return new PlayerView();
  }
}
