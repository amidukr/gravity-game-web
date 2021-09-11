import { Quaternion, Vector2, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { quanterionBaseVector } from "../../../../../common/framework/game/3rd-party/threejs/Constants";
import { GameEvent } from "../../../../../common/framework/game/GameEvent";
import { AxisUserInput } from "../../../../../common/framework/game/input/AxisUserInput";
import { MouseDevice } from "../../../../../common/framework/game/input/devices/MouseDevice";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";
import { GameViewLoop } from "../../../../../common/framework/game/ui/view/GameViewLoop";
import { PlayerView, PlayerViewModel } from "../../../model/PlayerControlModel";
import { SpaceShipsModel } from "../../../model/SpaceShipsModel";

export class FreeFlyProcessingLoop implements GameViewLoop {
  axisInput!: AxisUserInput;
  playerViewModel!: PlayerViewModel;
  spaceShipsModel!: SpaceShipsModel;

  maxRotationAngle = (1.5 * Math.PI) / 1000;
  startRotationAt = 0.1;
  rotationSteepnes = 20;
  mouseNavigationEanbledSpeedUpTime = 5 * 1000;

  startNewGame(application: ApplicationContainer, gameView: GameView) {
    this.axisInput = gameView.axisUserInput;
    this.playerViewModel = application.getComponent(PlayerViewModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  private handleMouseEvent(event: GameEvent, playerView: PlayerView) {
    const mousePointerArray = this.axisInput.getCoordinates([MouseDevice.RELATIVE_X, MouseDevice.RELATIVE_Y]);

    const mousePointer = new Vector2().fromArray(mousePointerArray);
    mousePointer.multiplyScalar(2).sub(new Vector2(1, 1));

    const mousePointerOrth = new Vector3(mousePointer.y, -mousePointer.x, 0).normalize();

    var rotateAngle = mousePointer.length();

    if (rotateAngle > this.startRotationAt) {
      rotateAngle = (rotateAngle - this.startRotationAt) / (1 - this.startRotationAt);
      rotateAngle = (Math.pow(this.rotationSteepnes, rotateAngle) - 1) / (this.rotationSteepnes - 1);
      rotateAngle *= this.maxRotationAngle;
      const mouseEnabledNavigationFactor = Math.min(1,  (new Date().getTime() - this.playerViewModel.object.mouseNavigationEanbledAt) / this.mouseNavigationEanbledSpeedUpTime)

      rotateAngle *= mouseEnabledNavigationFactor;
    } else {
      rotateAngle = 0;
    }

    const mouseBasedTransformation = new Quaternion()
      .setFromAxisAngle(mousePointerOrth, rotateAngle * event.elapsedTimeMills)
      .normalize();

    playerView.viewQuaternion.multiply(mouseBasedTransformation).normalize();
  }

  execute(event: GameEvent) {
    const playerSpaceShip = this.spaceShipsModel.object.player;

    const playerView = this.playerViewModel.object;

    if (playerView.mouseNavigationEanbledAt) {
      this.handleMouseEvent(event, this.playerViewModel.object);
    }

    playerSpaceShip.velocity = quanterionBaseVector().applyQuaternion(playerView.viewQuaternion).normalize();

    playerSpaceShip.position.add(
      new Vector3()
        .copy(playerSpaceShip.velocity)
        .multiplyScalar(playerSpaceShip.throttle * 0.0005 * event.elapsedTimeMills)
    );
  }
}
