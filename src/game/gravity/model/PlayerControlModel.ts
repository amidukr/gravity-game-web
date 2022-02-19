import { PerspectiveCamera } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { LoadGameObject } from "../../../common/game/engine/features/loader/object/LoadGameObject";
import { BaseGameStateModel } from "../../../common/game/engine/framework/GameModelTypes";

export class PlayerView {
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.000001, 1000);
  mouseNavigationEanbledAt: number = 0;
}

export class PlayerViewModel extends BaseGameStateModel<PlayerView> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(loadGameObject: LoadGameObject): PlayerView {
    return new PlayerView();
  }
}
