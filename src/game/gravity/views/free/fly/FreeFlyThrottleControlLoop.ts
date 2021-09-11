import { Quaternion, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { GameEvent } from "../../../../../common/framework/game/GameEvent";
import { MappedUserInput } from "../../../../../common/framework/game/input/MappedUserInput";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";
import { GameViewLoop } from "../../../../../common/framework/game/ui/view/GameViewLoop";
import {
  COMMON_GROUP,
  ROLL_LEFT_ACTION,
  ROLL_RIGHT_ACTION,
  THROTTLE_DOWN_ACTION,
  THROTTLE_UP_ACTION,
} from "../../../input/mappings/GravityGameInputMappings";
import { PlayerViewModel } from "../../../model/PlayerControlModel";
import { SpaceShipsModel } from "../../../model/SpaceShipsModel";

export class FreeFlyThrottleControlLoop implements GameViewLoop {
  gameView!: GameView;
  mappedUserInput!: MappedUserInput;
  playerViewModel!: PlayerViewModel;
  spaceShipsModel!: SpaceShipsModel;

  startNewGame(application: ApplicationContainer, gameView: GameView) {
    this.gameView = gameView;
    this.mappedUserInput = application.getComponent(MappedUserInput);
    this.playerViewModel = application.getComponent(PlayerViewModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  execute(event: GameEvent): void {
    const throttleFactor = Math.pow(2, 0.002 * event.elapsedTimeMills);
    const rollFactor = 0.001;

    if (this.mappedUserInput.isActionPressed(this.gameView, COMMON_GROUP, THROTTLE_UP_ACTION)) {
      this.spaceShipsModel.object.player.throttle *= throttleFactor;
    }

    if (this.mappedUserInput.isActionPressed(this.gameView, COMMON_GROUP, THROTTLE_DOWN_ACTION)) {
      this.spaceShipsModel.object.player.throttle /= throttleFactor;
    }

    var roll = 0;

    if (this.mappedUserInput.isActionPressed(this.gameView, COMMON_GROUP, ROLL_LEFT_ACTION)) {
      roll += 1;
    }

    if (this.mappedUserInput.isActionPressed(this.gameView, COMMON_GROUP, ROLL_RIGHT_ACTION)) {
      roll -= 1;
    }

    if (roll != 0) {
      this.playerViewModel.object.viewQuaternion
        .multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), roll * rollFactor * event.elapsedTimeMills))
        .normalize();
    }
  }
}
