import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { MappedUserInput } from "../../../../../common/game/engine/features/input/MappedUserInput";
import { InputButton } from "../../../../../common/game/engine/features/input/types/InputButton";
import { BaseGameViewButtonHandler } from "../../../../../common/game/engine/ui/view/BaseGameViewButtonHandler";
import { PlayerControlModel } from "../../../features/player-control/PlayerControlModel";
import { SpaceShipsModel } from "../../../features/space-ships/SpaceShipsModel";
import { COMMON_GROUP, MOUSE_NAVIGATION_TOGGLE_ACTION, REVERSE_THROTTLE_ACTION } from "../../../input/mappings/GravityGameInputMappings";

export class FreeFlyButtonHandler extends BaseGameViewButtonHandler {
  mappedUserInput!: MappedUserInput;
  playerViewModel!: PlayerControlModel;
  spaceShipsModel!: SpaceShipsModel;

  autowire(application: ApplicationContainer) {
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
    this.playerViewModel = application.getComponent(PlayerControlModel);
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
