import { Quaternion, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseGameStateModel } from "../../../../../common/game/engine/framework/GameModelTypes";

export class SpaceShipCollection {
  player = {
    orientation: new Quaternion(),
    position: new Vector3(),
    velocity: new Vector3(),
    throttle: 0.01,
  };
}

export class SpaceShipsModel extends BaseGameStateModel<SpaceShipCollection> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(): SpaceShipCollection {
    return new SpaceShipCollection();
  }
}
