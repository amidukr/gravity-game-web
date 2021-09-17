import { PerspectiveCamera } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { LoadGameObject } from "../../../common/framework/game/loader/object/LoadGameObject";
import { BaseGameModel } from "../../../common/framework/game/model/BaseGameModel";

export class PlayerView {
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.000001, 1000);
  mouseNavigationEanbledAt: number = 0;
}

export class PlayerViewModel extends BaseGameModel<PlayerView> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(loadGameObject: LoadGameObject): PlayerView {
    return new PlayerView();
  }
}
