import { Quaternion, Vector3 } from "three";
import { BaseGameModel } from "../../../../../common/game/engine/framework/GameModelTypes";

export class SpaceShipCollection {
  player = {
    orientation: new Quaternion(),
    position: new Vector3(),
    velocity: new Vector3(),
    throttle: 0.01,
  };
}

export class SpaceShipsModel extends BaseGameModel<SpaceShipCollection> {
  construtNewObject(): SpaceShipCollection {
    return new SpaceShipCollection();
  }
}
