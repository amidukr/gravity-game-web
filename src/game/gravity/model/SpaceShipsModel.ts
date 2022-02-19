import { Quaternion, Vector3 } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BaseGameModel } from "../../../common/game/engine/core/interface/GameModel";
import { LoadGameObject } from "../../../common/game/engine/features/loader/object/LoadGameObject";

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
