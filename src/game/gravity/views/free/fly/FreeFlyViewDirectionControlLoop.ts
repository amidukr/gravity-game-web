import { Quaternion, Vector2, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { quanterionBaseVector } from "../../../../../common/framework/game/3rd-party/threejs/Constants";
import { GameEvent } from "../../../../../common/framework/game/GameEvent";
import { AxisUserInput } from "../../../../../common/framework/game/input/AxisUserInput";
import { MouseDevice } from "../../../../../common/framework/game/input/devices/MouseDevice";
import { BaseGameLoop } from "../../../../../common/framework/game/looper/GameLoop";
import { PlayerViewModel } from "../../../model/PlayerControlModel";
import { SpaceShipsModel } from "../../../model/SpaceShipsModel";

export class FreeFlyProcessingLoop implements BaseGameLoop {
  axisInput!: AxisUserInput;
  playerViewModel!: PlayerViewModel;
  spaceShipsModel!: SpaceShipsModel;

  maxRotationAngle = (1.5 * Math.PI) / 1000;
  startRotationAt = 0.1;
  rotationSteepnes = 20;
  mouseNavigationEanbledSpeedUpTime = 5 * 1000;

  autowire(application: ApplicationContainer): void {
    this.axisInput = application.getComponent(AxisUserInput);
    this.playerViewModel = application.getComponent(PlayerViewModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  private handleMouseEvent(event: GameEvent) {
    const mousePointerArray = this.axisInput.getCoordinates([MouseDevice.RELATIVE_X, MouseDevice.RELATIVE_Y]);

    const mousePointer = new Vector2().fromArray(mousePointerArray);
    mousePointer.multiplyScalar(2).sub(new Vector2(1, 1));

    const mousePointerOrth = new Vector3(mousePointer.y, -mousePointer.x, 0).normalize();

    var rotateAngle = mousePointer.length();

    if (rotateAngle > this.startRotationAt) {
      rotateAngle = (rotateAngle - this.startRotationAt) / (1 - this.startRotationAt);
      rotateAngle = (Math.pow(this.rotationSteepnes, rotateAngle) - 1) / (this.rotationSteepnes - 1);
      rotateAngle *= this.maxRotationAngle;
      const mouseEnabledNavigationFactor = Math.min(
        1,
        (new Date().getTime() - this.playerViewModel.object.mouseNavigationEanbledAt) /
          this.mouseNavigationEanbledSpeedUpTime
      );

      rotateAngle *= mouseEnabledNavigationFactor;
    } else {
      rotateAngle = 0;
    }

    const mouseBasedTransformation = new Quaternion()
      .setFromAxisAngle(mousePointerOrth, rotateAngle * event.elapsedTimeMills)
      .normalize();

    this.spaceShipsModel.object.player.orientation.multiply(mouseBasedTransformation).normalize();
  }

  execute(event: GameEvent) {
    const playerSpaceShip = this.spaceShipsModel.object.player;

    const playerView = this.playerViewModel.object;

    if (playerView.mouseNavigationEanbledAt) {
      this.handleMouseEvent(event);
    }

    playerSpaceShip.velocity = quanterionBaseVector().applyQuaternion(playerSpaceShip.orientation).normalize();

    playerSpaceShip.position.add(
      new Vector3()
        .copy(playerSpaceShip.velocity)
        .multiplyScalar(playerSpaceShip.throttle * 0.0005 * event.elapsedTimeMills)
    );
  }
}
