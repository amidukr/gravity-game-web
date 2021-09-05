import { Quaternion, Vector3 } from "three";
import { typeIdentifier } from "../../../common/app/lookup/TypeIdentifier";
import { GameModel } from "../../../common/framework/game/model/GameModel";
import { GameModelObject } from "../../../common/framework/game/model/GameModelObject";

export const TYPE_GravityGameModel = typeIdentifier<GravityGameModel>(GameModel);

export type GravityGameModel = GameModel<GravityGameModelObject>;

export class GravityGameModelObject implements GameModelObject {
  type: "GameModelObject" = "GameModelObject";

  viewQuaternion = new Quaternion();

  spaceShips = {
    player: {
      position: new Vector3(),
      velocity: new Vector3(),
      throttle: 1,
    },
  };
}
