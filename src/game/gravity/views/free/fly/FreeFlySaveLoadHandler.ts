import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { MappedUserInput } from "../../../../../common/game/engine/features/input/MappedUserInput";
import { InputButton } from "../../../../../common/game/engine/features/input/types/InputButton";
import { GameViewButtonHandler } from "../../../../../common/game/engine/ui/view/GameViewButtonHandler";
import { COMMON_GROUP, LOAD_GAME_ACTION, SAVE_GAME_ACTION } from "../../../features/input-mappings/GravityGameInputMappings";
import { PlayerControlModel } from "../../../features/model-calculation/player-control/PlayerControlModel";
import { SpaceShipsModel } from "../../../features/model-calculation/space-ships/SpaceShipsModel";

interface SavedGame {
  position: number[];
  orientation: number[];
  throttle: number;
}

export class FreeFlySaveLoadHandler implements GameViewButtonHandler {
  mappedUserInput!: MappedUserInput;
  playerViewModel!: PlayerControlModel;
  spaceShipsModel!: SpaceShipsModel;

  startNewGame(application: ApplicationContainer) {
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
    this.playerViewModel = application.getComponent(PlayerControlModel);
    this.mappedUserInput = application.getComponent(MappedUserInput);
  }

  keyPressed(button: InputButton): void {
    const saveGameFileName = "gravity-game-saved-game";

    if (this.mappedUserInput.isEventOfAction(button, COMMON_GROUP, LOAD_GAME_ACTION)) {
      const savedGameString = localStorage.getItem(saveGameFileName);
      if (savedGameString) {
        const savedGame: SavedGame = JSON.parse(savedGameString);

        this.spaceShipsModel.object.player.orientation.fromArray(savedGame.orientation);
        this.playerViewModel.object.mouseNavigationEanbledAt = 0;
        this.spaceShipsModel.object.player.position.fromArray(savedGame.position);
        this.spaceShipsModel.object.player.throttle = savedGame.throttle;
      }
    }

    if (this.mappedUserInput.isEventOfAction(button, COMMON_GROUP, SAVE_GAME_ACTION)) {
      const saveGame: SavedGame = {
        position: this.spaceShipsModel.object.player.position.toArray(),
        orientation: this.spaceShipsModel.object.player.orientation.toArray(),
        throttle: this.spaceShipsModel.object.player.throttle,
      };

      localStorage.setItem(saveGameFileName, JSON.stringify(saveGame));
    }
  }
}
