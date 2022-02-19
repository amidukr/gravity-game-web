import { Quaternion, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { GameEvent } from "../../../../../common/framework/game/GameEvent";
import { MappedUserInput } from "../../../../../common/framework/game/input/MappedUserInput";
import { BaseGameLoop, TYPE_GameProcessingViewLoop } from "../../../../../common/framework/game/looper/GameLoop";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";
import {
  COMMON_GROUP,
  ROLL_LEFT_ACTION,
  ROLL_RIGHT_ACTION,
  THROTTLE_DOWN_ACTION,
  THROTTLE_UP_ACTION,
} from "../../../input/mappings/GravityGameInputMappings";
import { PlayerViewModel } from "../../../model/PlayerControlModel";
import { SpaceShipsModel } from "../../../model/SpaceShipsModel";

export class FreeFlyThrottleControlLoop extends BaseGameLoop {
  gameView!: GameView;
  mappedUserInput!: MappedUserInput;
  playerViewModel!: PlayerViewModel;
  spaceShipsModel!: SpaceShipsModel;

  constructor() {
    super(TYPE_GameProcessingViewLoop);
  }

  autowire(application: ApplicationContainer): void {
    this.gameView = application.getComponent(GameView);
    this.mappedUserInput = application.getComponent(MappedUserInput);
    this.playerViewModel = application.getComponent(PlayerViewModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  startNewGame(application: ApplicationContainer, gameView: GameView) {}

  execute(event: GameEvent): void {
    const highThrottleFactor = Math.pow(2, 0.001 * event.elapsedTimeMills);
    const lowThrottleFactor = Math.pow(2, 0.005 * event.elapsedTimeMills);
    const timeToLowThrottle = 10 * 1000;

    const rollFactor = 0.001;

    const throttleUpElapsedTime = this.mappedUserInput.getActionElapsedTime(
      this.gameView,
      COMMON_GROUP,
      THROTTLE_UP_ACTION
    );
    const throttleDownElapsedTime = this.mappedUserInput.getActionElapsedTime(
      this.gameView,
      COMMON_GROUP,
      THROTTLE_DOWN_ACTION
    );

    const throttleChangeElapsedTime = Math.max(throttleUpElapsedTime || 0, throttleDownElapsedTime || 0);

    if (throttleChangeElapsedTime) {
      var throttleFactor;
      if (throttleChangeElapsedTime < timeToLowThrottle) {
        const timeHighToLowThrottleFactor = (timeToLowThrottle - throttleChangeElapsedTime) / timeToLowThrottle;
        throttleFactor =
          (1 - timeHighToLowThrottleFactor) * highThrottleFactor + timeHighToLowThrottleFactor * lowThrottleFactor;
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
