import { Application } from "../../../../../common/app/Application";
import { MappedUserInput } from "../../../../../common/framework/game/input/MappedUserInput";
import { InputButton } from "../../../../../common/framework/game/input/types/InputButton";
import { GameViewButtonHandler } from "../../../../../common/framework/game/ui/view/GameViewButtonHandler";
import {
  COMMON_GROUP,
  MOUSE_NAVIGATION_TOGGLE_ACTION,
  REVERSE_THROTTLE_ACTION,
} from "../../../input/mappings/GravityGameInputMappings";
import { GravityGameModel, TYPE_GravityGameModel } from "../../../model/GravityGameModelObject";

export class FreeFlyButtonHandler implements GameViewButtonHandler {
  mappedUserInput!: MappedUserInput;
  gameModel!: GravityGameModel;

  startNewGame(application: Application) {
    this.gameModel = application.getComponent(TYPE_GravityGameModel);
    this.mappedUserInput = application.getComponent(MappedUserInput);
  }

  keyPressed(button: InputButton): void {
    if (this.mappedUserInput.isEventOfAction(button, COMMON_GROUP, REVERSE_THROTTLE_ACTION)) {
      this.gameModel.object.spaceShips.player.throttle *= -1;
    }

    if (this.mappedUserInput.isEventOfAction(button, COMMON_GROUP, MOUSE_NAVIGATION_TOGGLE_ACTION)) {
      const modelView = this.gameModel.object.view;
      modelView.mouseNavigationEanbled = !modelView.mouseNavigationEanbled;
    }
  }
}
