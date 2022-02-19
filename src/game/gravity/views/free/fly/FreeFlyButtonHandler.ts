import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { MappedUserInput } from "../../../../../common/game/engine/features/input/MappedUserInput";
import { InputButton } from "../../../../../common/game/engine/features/input/types/InputButton";
import { BaseGameViewButtonHandler } from "../../../../../common/game/engine/ui/view/BaseGameViewButtonHandler";
import { COMMON_GROUP, MOUSE_NAVIGATION_TOGGLE_ACTION, REVERSE_THROTTLE_ACTION } from "../../../input/mappings/GravityGameInputMappings";
import { PlayerViewModel } from "../../../model/PlayerControlModel";
import { SpaceShipsModel } from "../../../model/SpaceShipsModel";

export class FreeFlyButtonHandler extends BaseGameViewButtonHandler {
  mappedUserInput!: MappedUserInput;
  playerViewModel!: PlayerViewModel;
  spaceShipsModel!: SpaceShipsModel;

  autowire(application: ApplicationContainer) {
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
      if (modelView.mouseNavigationEanbledAt) {
        modelView.mouseNavigationEanbledAt = 0;
      } else {
        modelView.mouseNavigationEanbledAt = new Date().getTime();
      }
    }
  }
}
