import { Quaternion, Vector3 } from "three";
import { Application } from "../../../../../common/app/Application";
import { GameEvent } from "../../../../../common/framework/game/GameEvent";
import { MappedUserInput } from "../../../../../common/framework/game/input/MappedUserInput";
import { GameModel } from "../../../../../common/framework/game/model/GameModel";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";
import { GameViewLoop } from "../../../../../common/framework/game/ui/view/GameViewLoop";
import {
  COMMON_GROUP,
  ROLL_LEFT_ACTION,
  ROLL_RIGHT_ACTION,
  THROTTLE_DOWN_ACTION,
  THROTTLE_UP_ACTION,
} from "../../../input/mappings/GravityGameInputMappings";
import { GravityGameModel, GravityGameModelObject, TYPE_GravityGameModel } from "../../../model/GravityGameModelObject";

export class FreeFlyThrottleControlLoop implements GameViewLoop {
  private gameView!: GameView;
  private mappedUserInput!: MappedUserInput;
  private gameModel!: GravityGameModel;

  start(application: Application, gameView: GameView) {
    this.gameView = gameView;
    this.mappedUserInput = application.getComponent(MappedUserInput);
    this.gameModel = application.getComponent(TYPE_GravityGameModel);
  }

  execute(event: GameEvent): void {
    const throttleFactor = 1.01
    const rollFactor = 0.001

    if (this.mappedUserInput.isActionPressed(this.gameView, COMMON_GROUP, THROTTLE_UP_ACTION)) {
      this.gameModel.object.spaceShips.player.throttle *= throttleFactor;
    }

    if (this.mappedUserInput.isActionPressed(this.gameView, COMMON_GROUP, THROTTLE_DOWN_ACTION)) {
      this.gameModel.object.spaceShips.player.throttle /= throttleFactor;
    }

    var roll = 0

    if(this.mappedUserInput.isActionPressed(this.gameView, COMMON_GROUP, ROLL_LEFT_ACTION)) {
        roll += 1
    }

    if(this.mappedUserInput.isActionPressed(this.gameView, COMMON_GROUP, ROLL_RIGHT_ACTION)) {
        roll -= 1
    }
    
    if(roll != 0) {
        this.gameModel.object.viewQuaternion.multiply(
            new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), roll * rollFactor *  event.elapsedTimeMills)
        ).normalize()
    }
  }
}
