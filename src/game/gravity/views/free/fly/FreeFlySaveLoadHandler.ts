import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { MappedUserInput } from "../../../../../common/framework/game/input/MappedUserInput";
import { InputButton } from "../../../../../common/framework/game/input/types/InputButton";
import { GameViewButtonHandler } from "../../../../../common/framework/game/ui/view/GameViewButtonHandler";
import { COMMON_GROUP, LOAD_GAME_ACTION, SAVE_GAME_ACTION } from "../../../input/mappings/GravityGameInputMappings";
import { PlayerViewModel } from "../../../model/PlayerControlModel";
import { SpaceShipsModel } from "../../../model/SpaceShipsModel";

interface SavedGame {
  position: number[];
  viewQuaternion: number[];
  throttle: number;
}

export class FreeFlySaveLoadHandler implements GameViewButtonHandler {
  mappedUserInput!: MappedUserInput;
  playerViewModel!: PlayerViewModel;
  spaceShipsModel!: SpaceShipsModel;

  startNewGame(application: ApplicationContainer) {
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
    this.playerViewModel = application.getComponent(PlayerViewModel);
    this.mappedUserInput = application.getComponent(MappedUserInput);
  }

  keyPressed(button: InputButton): void {
    const saveGameFileName = "gravity-game-saved-game";

    if (this.mappedUserInput.isEventOfAction(button, COMMON_GROUP, LOAD_GAME_ACTION)) {
      const savedGameString = localStorage.getItem(saveGameFileName);
      if (savedGameString) {
        const savedGame: SavedGame = JSON.parse(savedGameString);

        this.playerViewModel.object.viewQuaternion.fromArray(savedGame.viewQuaternion);
        this.playerViewModel.object.mouseNavigationEanbledAt = 0;
        this.spaceShipsModel.object.player.position.fromArray(savedGame.position);
        this.spaceShipsModel.object.player.throttle = savedGame.throttle;
      }
    }

    if (this.mappedUserInput.isEventOfAction(button, COMMON_GROUP, SAVE_GAME_ACTION)) {
      const saveGame: SavedGame = {
        position: this.spaceShipsModel.object.player.position.toArray(),
        viewQuaternion: this.playerViewModel.object.viewQuaternion.toArray(),
        throttle: this.spaceShipsModel.object.player.throttle,
      };

      localStorage.setItem(saveGameFileName, JSON.stringify(saveGame));
    }
  }
}
