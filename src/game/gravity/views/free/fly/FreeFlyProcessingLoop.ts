import { Quaternion, Vector2, Vector3 } from "three";
import { Application } from "../../../../../common/app/Application";
import { quanterionBaseVector } from "../../../../../common/framework/game/3rd-party/threejs/Constants";
import { GameEvent } from "../../../../../common/framework/game/GameEvent";
import { AxisUserInput } from "../../../../../common/framework/game/input/AxisUserInput";
import { MouseDevice } from "../../../../../common/framework/game/input/devices/MouseDevice";
import { GameModel } from "../../../../../common/framework/game/model/GameModel";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";
import { GameViewLoop } from "../../../../../common/framework/game/ui/view/GameViewLoop";
import { GravityGameModelObject, TYPE_GravityGameModel } from "../../../model/GravityGameModelObject";

export class FreeFlyProcessingLoop implements GameViewLoop {
  private axisInput!: AxisUserInput;
  private model!: GameModel<GravityGameModelObject>;

  startNewGame(application: Application, gameView: GameView) {
    this.axisInput = gameView.axisUserInput;
    this.model = application.getComponent(TYPE_GravityGameModel);
  }

  private handleMouseEvent(event: GameEvent, modelObject: GravityGameModelObject) {
    const mousePointerArray = this.axisInput.getCoordinates([MouseDevice.RELATIVE_X, MouseDevice.RELATIVE_Y]);

    const mousePointer = new Vector2().fromArray(mousePointerArray);
    mousePointer.multiplyScalar(2).sub(new Vector2(1, 1));

    const mousePointerOrth = new Vector3(mousePointer.y, -mousePointer.x, 0).normalize();

    var rotateAngle = mousePointer.length();

    rotateAngle = Math.pow(10 * 500, rotateAngle) / 500;

    if (rotateAngle < 0.01) {
      rotateAngle = 0;
    }

    const mouseBasedTransformation = new Quaternion()
      .setFromAxisAngle(mousePointerOrth, rotateAngle * event.elapsedTimeMills * 0.001)
      .normalize();

    modelObject.view.quaternion.multiply(mouseBasedTransformation).normalize();
  }

  execute(event: GameEvent) {
    const modelObject = this.model.object;
    const playerSpaceShip = this.model.object.spaceShips.player;

    if (this.model.object.view.mouseNavigationEanbled) {
      this.handleMouseEvent(event, modelObject);
    }

    playerSpaceShip.velocity = quanterionBaseVector().applyQuaternion(modelObject.view.quaternion).normalize();

    playerSpaceShip.position.add(
      new Vector3()
        .copy(playerSpaceShip.velocity)
        .multiplyScalar(playerSpaceShip.throttle * 0.0005 * event.elapsedTimeMills)
    );
  }
}
