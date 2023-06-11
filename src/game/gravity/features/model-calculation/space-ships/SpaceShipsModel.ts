import { Quaternion, Vector3 } from "three";
import { BaseGameModel } from "../../../../../common/game/engine/framework/GameModelTypes";
import { UssObject } from "../../commons/universe-sublocation/model/UssObject";
import { USSL_UNIVERSE } from "../gravity-sublocation/GravityUsslContainerHandler";

export interface PlayerSpaceShip {
  ussPosition: UssObject;
  globalCoordinate: Vector3;
  orientation: Quaternion;
  throttle: number;
}

export interface SpaceShipCollection {
  player: PlayerSpaceShip
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
