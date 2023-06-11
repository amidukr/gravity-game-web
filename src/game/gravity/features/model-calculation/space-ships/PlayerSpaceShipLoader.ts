import { Quaternion, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseGameModelLoader } from "../../../../../common/game/engine/framework/GameLoaderTypes";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../../game-level/GravityGameLevelObject";
import { PlayerControlModel } from "../player-control/PlayerControlModel";
import { SpaceShipsModel } from "./SpaceShipsModel";
import { setQuaternionFromProperEuler } from "three/src/math/MathUtils";
import { alignQuaternionToVector } from "../../../../../common/utils/ThreeJsUtils";
import { quanterionBaseVector } from "../../../../../common/game/engine/3rd-party/threejs/Constants";

declare global {
  interface Window {
    [name: string]: any;
  }
}

export class PlayerSpaceShipLoader extends BaseGameModelLoader {
  spaceShipsModel!: SpaceShipsModel;
  playerViewModel!: PlayerControlModel;
  gameLevel!: GravityGameLevel;

  autowire(application: ApplicationContainer) {
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.playerViewModel = application.getComponent(PlayerControlModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  async startNewGame(): Promise<void> {
    const startPosition = this.gameLevel.object.rootScene.getObjectByName("Start-Position");

    if (startPosition == null) {
      throw Error("Can't find Start-Position object in scene");
    }

    const playerSpaceShip = this.spaceShipsModel.object.player;

    const orientation = startPosition.getWorldQuaternion(new Quaternion()).multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2)) 
    //orientation.slerpQuaternions(new Vector3(0, 0.0, 0.0), new Vector3(-1, 0, 0).normalize())
    //alignQuaternionToVector(orientation, new Vector3(-1,0.0, -0.3));
    //alignQuaternionToVector(orientation, new Vector3(-1,0, 0));

    console.info("New Quaternion vector", quanterionBaseVector().applyQuaternion(orientation))
    


    playerSpaceShip.throttle = this.gameLevel.object.data.spaceShips.player.throttle || 0.1;
    
    playerSpaceShip.orientation.copy(orientation);

    playerSpaceShip.ussPosition.position = startPosition.getWorldPosition(new Vector3());
    playerSpaceShip.ussPosition.velocity = quanterionBaseVector().applyQuaternion(orientation)
    playerSpaceShip.globalCoordinate = playerSpaceShip.ussPosition.position.clone();

    console.info("Start location", playerSpaceShip.globalCoordinate.toArray())
  }
}
