import { instanceToPlain, plainToInstance } from "class-transformer";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { MappedUserInput } from "../../../../../common/game/engine/features/input/MappedUserInput";
import { InputButton } from "../../../../../common/game/engine/features/input/types/InputButton";
import { BaseGameViewButtonHandler } from "../../../../../common/game/engine/ui/view/BaseGameViewButtonHandler";
import { UssObject } from "../../../features/commons/universe-sublocation/model/UssObject";
import { COMMON_GROUP, LOAD_GAME_ACTION, SAVE_GAME_ACTION } from "../../../features/input-mappings/GravityGameInputMappings";
import { PlayerControlModel } from "../../../features/model-calculation/player-control/PlayerControlModel";
import { SpaceShipsModel } from "../../../features/model-calculation/space-ships/SpaceShipsModel";
import  ESSerializer   from "esserializer";
import { Vector3 } from "three";

interface SavedGame {
  position: UssObject;
  orientation: number[];
  throttle: number;
}

export class FreeFlySaveLoadHandler extends BaseGameViewButtonHandler {
  mappedUserInput!: MappedUserInput;
  playerViewModel!: PlayerControlModel;
  spaceShipsModel!: SpaceShipsModel;

  override autowire?(application: ApplicationContainer): void {
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
    this.playerViewModel = application.getComponent(PlayerControlModel);
    this.mappedUserInput = application.getComponent(MappedUserInput);
  }

  keyPressed(button: InputButton): void {
    const saveGameFileName = "gravity-game-saved-game";

    if (this.mappedUserInput.isEventOfAction(button, COMMON_GROUP, LOAD_GAME_ACTION)) {
      const savedGameString = localStorage.getItem(saveGameFileName);
      if (savedGameString) {
        const savedGame: SavedGame = ESSerializer.deserialize(savedGameString, [Vector3]);

        this.spaceShipsModel.object.player.orientation.fromArray(savedGame.orientation);
        this.playerViewModel.object.mouseNavigationEanbledAt = 0;
        this.spaceShipsModel.object.player.ussPosition = savedGame.position;
        this.spaceShipsModel.object.player.throttle = savedGame.throttle;
      }
    }

    if (this.mappedUserInput.isEventOfAction(button, COMMON_GROUP, SAVE_GAME_ACTION)) {
      const saveGame: SavedGame = {
        position: this.spaceShipsModel.object.player.ussPosition,
        orientation: this.spaceShipsModel.object.player.orientation.toArray(),
        throttle: this.spaceShipsModel.object.player.throttle,
      };

      localStorage.setItem(saveGameFileName, ESSerializer.serialize(saveGame));
    }
  }
}
