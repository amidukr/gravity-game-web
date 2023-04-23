import { Quaternion, Vector3 } from "three";
import { BaseGameModel } from "../../../../../common/game/engine/framework/GameModelTypes";
import { UssCoordinate } from "../../commons/universe-sublocation/model/UssCoordinate";
import { USSL_UNIVERSE } from "../gravity-sublocation/GravityUsslh";

export interface SpaceShipCollection {
  player: {
    ussPosition: UssCoordinate;
    globalCoordinate: Vector3;
    orientation: Quaternion;
    throttle: number;
  };
}

export class SpaceShipsModel extends BaseGameModel<SpaceShipCollection> {
  construtNewObject(): SpaceShipCollection {
    return {
      player: {
        ussPosition: {
          location: {
            type: USSL_UNIVERSE,
            parent: null,
            attributes: null,
          },
          position: new Vector3(),
          velocity: new Vector3(),
        },
        globalCoordinate: new Vector3(),
        orientation: new Quaternion(),
        throttle: 0.01,
      },
    };
  }
}
