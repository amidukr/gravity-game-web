import { Quaternion, Vector3 } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { LoadGameObject } from "../../../common/framework/game/loader/object/LoadGameObject";
import { BaseGameModel } from "../../../common/framework/game/model/BaseGameModel";

export class SpaceShipCollection {
  player = {
    orientation: new Quaternion(),
    position: new Vector3(),
    velocity: new Vector3(),
    throttle: 0.01,
  };
}

export class SpaceShipsModel extends BaseGameModel<SpaceShipCollection> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(loadGameObject: LoadGameObject): SpaceShipCollection {
    return new SpaceShipCollection();
  }
}
