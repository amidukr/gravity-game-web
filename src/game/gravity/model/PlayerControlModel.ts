import { Quaternion } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { LoadGameObject } from "../../../common/framework/game/loader/object/LoadGameObject";
import { BaseGameModel } from "../../../common/framework/game/model/BaseGameModel";

export class PlayerView {
  viewQuaternion = new Quaternion();
  mouseNavigationEanbled = false;
}

export class PlayerViewModel extends BaseGameModel<PlayerView> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(loadGameObject: LoadGameObject): PlayerView {
    return new PlayerView();
  }
}
