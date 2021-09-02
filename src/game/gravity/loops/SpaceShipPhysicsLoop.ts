import { AmbientLight, Quaternion, Vector2, Vector3 } from "three";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEvent } from "../../../common/framework/game/GameEvent";
import { MouseDevice } from "../../../common/framework/game/input/devices/MouseDevice";
import { GameAxisDeviceInput } from "../../../common/framework/game/input/GameAxisDeviceInput";
import {
  GameLoop,
  TYPE_GameLooper,
} from "../../../common/framework/game/looper/GameLoop";
import { GravityGameModel } from "../model/GravityGameModel";

export class SpaceShipPhysicsLoop implements GameLoop {
  private axisInput!: GameAxisDeviceInput;
  private model!: GravityGameModel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLooper);
  }

  start(application: Application) {
    this.axisInput = application.getComponent(GameAxisDeviceInput);
    this.model = application.getComponent(GravityGameModel)
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

    var rotateAngle = mousePointer.length() 

    rotateAngle = Math.pow(10*500, rotateAngle) / 500

    if(rotateAngle < 0.01) {
      rotateAngle = 0
    }

    const mouseBasedTransformation = new Quaternion().setFromAxisAngle(
      mousePointerOrth,
      rotateAngle * event.elapsedTimeMills * 0.001
    ).normalize();

    const playerSpaceShipView = this.model.persistentLocal.spaceShips.player
    const playerSpaceShip = this.model.persistentShared.spaceShips.player

    var viewQuanterion = new Quaternion()
      .fromArray(playerSpaceShipView.viewQuanterion)
      .multiply(mouseBasedTransformation)
      .normalize()

    playerSpaceShipView.viewQuanterion = viewQuanterion.toArray()
    
    const velocity = new Vector3(0,0,-1).applyQuaternion(viewQuanterion).normalize()
    
    playerSpaceShip.velocity = velocity.toArray()
    const position = new Vector3().fromArray(playerSpaceShip.position).add(velocity.multiplyScalar(0.0005 * event.elapsedTimeMills))

    playerSpaceShip.position = position.toArray()
  }
}
