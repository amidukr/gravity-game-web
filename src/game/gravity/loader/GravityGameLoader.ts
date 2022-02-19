import { Quaternion, Vector3 } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BaseGameLoaderModule } from "../../../common/framework/game/loader/BaseGameLoaderModule";
import { LoadGameObject } from "../../../common/framework/game/loader/object/LoadGameObject";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";
import { GravitySceneModel } from "../model/GravitySceneModel";
import { PlayerViewModel } from "../model/PlayerControlModel";
import { SpaceShipsModel } from "../model/SpaceShipsModel";

declare global {
  interface Window {
    [name: string]: any;
  }
}

export class GravityGameLoader extends BaseGameLoaderModule {
  spaceShipsModel!: SpaceShipsModel;
  playerViewModel!: PlayerViewModel;
  gameLevel!: GravityGameLevel;

  autowire(application: ApplicationContainer) {
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.playerViewModel = application.getComponent(PlayerViewModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);

    window.sceneModel = application.getComponent(GravitySceneModel);
    window.playerViewModel = this.playerViewModel;
    window.spaceShipsModel = this.spaceShipsModel;
    window.gameLevel = this.gameLevel;
  }

  async startNewGame(loadGameObject: LoadGameObject): Promise<void> {
    const startPosition = this.gameLevel.object.rootScene.getObjectByName("Start-Position");

    if (startPosition == null) {
      throw Error("Can't find Start-Position object in scene");
    }

    const playerSpaceShip = this.spaceShipsModel.object.player;

    playerSpaceShip.throttle = this.gameLevel.object.data.spaceShips.player.throttle || 0.1;
    playerSpaceShip.position = startPosition.getWorldPosition(new Vector3());
    playerSpaceShip.orientation.copy(
      startPosition
        .getWorldQuaternion(new Quaternion())
        .multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2))
    );
  }
}
