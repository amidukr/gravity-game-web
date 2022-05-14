import { Quaternion, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { MappedUserInput } from "../../../../../common/game/engine/features/input/MappedUserInput";
import { BaseGameInputLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";
import { GameView } from "../../../../../common/game/engine/ui/view/GameView";
import {
  COMMON_GROUP,
  ROLL_LEFT_ACTION,
  ROLL_RIGHT_ACTION,
  THROTTLE_DOWN_ACTION,
  THROTTLE_UP_ACTION,
} from "../../../features/input-mappings/GravityGameInputMappings";
import { PlayerControlModel } from "../../../features/model-calculation/player-control/PlayerControlModel";
import { SpaceShipsModel } from "../../../features/model-calculation/space-ships/SpaceShipsModel";

export class FreeFlyThrottleControlLoop extends BaseGameInputLooper {
  gameView!: GameView;
  mappedUserInput!: MappedUserInput;
  playerViewModel!: PlayerControlModel;
  spaceShipsModel!: SpaceShipsModel;

  autowire(application: ApplicationContainer): void {
    this.gameView = application.getComponent(GameView);
    this.mappedUserInput = application.getComponent(MappedUserInput);
    this.playerViewModel = application.getComponent(PlayerControlModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  execute(event: GameEvent): void {
    const highThrottleFactor = Math.pow(2, 0.001 * event.elapsedTimeMills);
    const lowThrottleFactor = Math.pow(2, 0.005 * event.elapsedTimeMills);
    const timeToLowThrottle = 10 * 1000;

    const rollFactor = 0.001;

    const throttleUpElapsedTime = this.mappedUserInput.getActionElapsedTime(this.gameView, COMMON_GROUP, THROTTLE_UP_ACTION);
    const throttleDownElapsedTime = this.mappedUserInput.getActionElapsedTime(this.gameView, COMMON_GROUP, THROTTLE_DOWN_ACTION);

    const throttleChangeElapsedTime = Math.max(throttleUpElapsedTime || 0, throttleDownElapsedTime || 0);

    if (throttleChangeElapsedTime) {
      var throttleFactor;
      if (throttleChangeElapsedTime < timeToLowThrottle) {
        const timeHighToLowThrottleFactor = (timeToLowThrottle - throttleChangeElapsedTime) / timeToLowThrottle;
        throttleFactor = (1 - timeHighToLowThrottleFactor) * highThrottleFactor + timeHighToLowThrottleFactor * lowThrottleFactor;
      } else {
        throttleFactor = lowThrottleFactor;
      }

      if (throttleUpElapsedTime != undefined) {
        this.spaceShipsModel.object.player.throttle *= throttleFactor;
      }

      if (throttleDownElapsedTime != undefined) {
        this.spaceShipsModel.object.player.throttle /= throttleFactor;
      }
    }

    var roll = 0;

    if (this.mappedUserInput.isActionPressed(this.gameView, COMMON_GROUP, ROLL_LEFT_ACTION)) {
      roll += 1;
    }

    if (this.mappedUserInput.isActionPressed(this.gameView, COMMON_GROUP, ROLL_RIGHT_ACTION)) {
      roll -= 1;
    }

    if (roll != 0) {
      this.spaceShipsModel.object.player.orientation
        .multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), roll * rollFactor * event.elapsedTimeMills))
        .normalize();
    }
  }
}
