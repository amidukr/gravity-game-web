import { AmbientLight, Quaternion, Vector2, Vector3 } from "three";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEvent } from "../../../common/framework/game/GameEvent";
import { MouseDevice } from "../../../common/framework/game/input/devices/MouseDevice";
import { AxisUserInput } from "../../../common/framework/game/input/AxisUserInput";
import {
  GameLoop,
  TYPE_GameLooper,
} from "../../../common/framework/game/looper/GameLoop";
import { GameModel } from "../../../common/framework/game/model/GameModel";
import {
  GravityGameModelObject,
  TYPE_GravityGameModel,
} from "../model/GravityGameModelObject";

export class SpaceShipPhysicsLoop implements GameLoop {
  private axisInput!: AxisUserInput;
  private model!: GameModel<GravityGameModelObject>;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLooper);
  }

  start(application: Application) {
    this.axisInput = application.getComponent(AxisUserInput);
    this.model = application.getComponent(TYPE_GravityGameModel);
  }

  execute(event: GameEvent) {
    const mousePointerArray = this.axisInput.getCoordinates([
      MouseDevice.RELATIVE_X,
      MouseDevice.RELATIVE_Y,
    ]);

    const mousePointer = new Vector2().fromArray(mousePointerArray);
    mousePointer.multiplyScalar(2).sub(new Vector2(1, 1));

    const mousePointerOrth = new Vector3(
      mousePointer.y,
      -mousePointer.x,
      0
    ).normalize();

    var rotateAngle = mousePointer.length();

    rotateAngle = Math.pow(10 * 500, rotateAngle) / 500;

    if (rotateAngle < 0.01) {
      rotateAngle = 0;
    }

    const mouseBasedTransformation = new Quaternion()
      .setFromAxisAngle(
        mousePointerOrth,
        rotateAngle * event.elapsedTimeMills * 0.001
      )
      .normalize();

    const modelObject = this.model.object;
    const playerSpaceShip = this.model.object.spaceShips.player;

    modelObject.viewQuaternion.multiply(mouseBasedTransformation).normalize();

    playerSpaceShip.velocity = new Vector3(0, 0, -1)
      .applyQuaternion(modelObject.viewQuaternion)
      .normalize();

    playerSpaceShip.position.add(
      new Vector3()
        .copy(playerSpaceShip.velocity)
        .multiplyScalar(0.0005 * event.elapsedTimeMills)
    );
  }
}
