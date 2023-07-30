import * as THREE from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { BaseGamePreRenderingLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GravityConfiguration } from "../../../configuration/GravityConfiguration";
import { SpaceShipsModel } from "../../../features/model-calculation/space-ships/SpaceShipsModel";

export class FreeFlyUpdateCamerPositionLooper extends BaseGamePreRenderingLooper {
  viewSceneModel!: ThreeJsGameViewSceneModel;
  spaceShipsModel!: SpaceShipsModel;

  override autowire(application: ApplicationContainer): void {
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  override execute() {
    const camera = this.viewSceneModel.object.camera;
    const playerShip = this.spaceShipsModel.object.player;

    camera.position.setZ(-0.0001);

    if (!GravityConfiguration.worldRelativeToCamera) {
      camera.position.copy(playerShip.globalCoordinate);
    } else {
      camera.position.set(0, 0, 0);
    }
    camera.setRotationFromQuaternion(new THREE.Quaternion().copy(playerShip.orientation).normalize());
  }
}
