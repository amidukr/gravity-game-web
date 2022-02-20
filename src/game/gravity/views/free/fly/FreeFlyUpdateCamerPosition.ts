import * as THREE from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { BaseGameSceneUpdateLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { SpaceShipsModel } from "../../../features/model-calculation/space-ships/SpaceShipsModel";

export class FreeFlyUpdateCamerPosition extends BaseGameSceneUpdateLooper {
  viewSceneModel!: ThreeJsGameViewSceneModel;
  spaceShipsModel!: SpaceShipsModel;

  override autowire(application: ApplicationContainer): void {
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  override execute() {
    const camera = this.viewSceneModel.object.camera;
    const playerShip = this.spaceShipsModel.object.player;

    camera.position.copy(playerShip.position);
    camera.setRotationFromQuaternion(new THREE.Quaternion().copy(playerShip.orientation).normalize());
  }
}
