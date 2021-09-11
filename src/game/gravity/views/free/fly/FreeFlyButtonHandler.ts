import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { MappedUserInput } from "../../../../../common/framework/game/input/MappedUserInput";
import { InputButton } from "../../../../../common/framework/game/input/types/InputButton";
import { GameViewButtonHandler } from "../../../../../common/framework/game/ui/view/GameViewButtonHandler";
import {
  COMMON_GROUP,
  MOUSE_NAVIGATION_TOGGLE_ACTION,
  REVERSE_THROTTLE_ACTION,
} from "../../../input/mappings/GravityGameInputMappings";
import { PlayerViewModel } from "../../../model/PlayerControlModel";
import { SpaceShipsModel } from "../../../model/SpaceShipsModel";

export class FreeFlyButtonHandler implements GameViewButtonHandler {
  mappedUserInput!: MappedUserInput;
  playerViewModel!: PlayerViewModel;
  spaceShipsModel!: SpaceShipsModel;

  startNewGame(application: ApplicationContainer) {
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
    this.playerViewModel = application.getComponent(PlayerViewModel);
    this.mappedUserInput = application.getComponent(MappedUserInput);
  }

  keyPressed(button: InputButton): void {
    if (this.mappedUserInput.isEventOfAction(button, COMMON_GROUP, REVERSE_THROTTLE_ACTION)) {
      this.spaceShipsModel.object.player.throttle *= -1;
    }

    if (this.mappedUserInput.isEventOfAction(button, COMMON_GROUP, MOUSE_NAVIGATION_TOGGLE_ACTION)) {
      const modelView = this.playerViewModel.object;
      modelView.mouseNavigationEanbled = !modelView.mouseNavigationEanbled;
    }
  }
}
