import { Quaternion, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseGameStateModelLoader } from "../../../../../common/game/engine/framework/GameLoaderTypes";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../game-level/GravityGameLevelObject";
import { GravitySceneModel } from "../gravity-universe/GravitySceneModel";
import { PlayerControlModel } from "../player-control/PlayerControlModel";
import { SpaceShipsModel } from "./SpaceShipsModel";

declare global {
  interface Window {
    [name: string]: any;
  }
}

export class GravityGameLoader extends BaseGameStateModelLoader {
  spaceShipsModel!: SpaceShipsModel;
  playerViewModel!: PlayerControlModel;
  gameLevel!: GravityGameLevel;

  autowire(application: ApplicationContainer) {
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.playerViewModel = application.getComponent(PlayerControlModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);

    window.sceneModel = application.getComponent(GravitySceneModel);
    window.playerViewModel = this.playerViewModel;
    window.spaceShipsModel = this.spaceShipsModel;
    window.gameLevel = this.gameLevel;
  }

  async startNewGame(): Promise<void> {
    const startPosition = this.gameLevel.object.rootScene.getObjectByName("Start-Position");

    if (startPosition == null) {
      throw Error("Can't find Start-Position object in scene");
    }

    const playerSpaceShip = this.spaceShipsModel.object.player;

    playerSpaceShip.throttle = this.gameLevel.object.data.spaceShips.player.throttle || 0.1;
    playerSpaceShip.position = startPosition.getWorldPosition(new Vector3());
    playerSpaceShip.orientation.copy(
      startPosition.getWorldQuaternion(new Quaternion()).multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2))
    );
  }
}
