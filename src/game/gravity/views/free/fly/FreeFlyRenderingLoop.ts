import * as THREE from "three";
import { BaseGravityViewRenderer } from "../../../loops/BaseGravityViewRenderer";

export class FreeFlyRenderingLoop extends BaseGravityViewRenderer {
  override execute() {
    const camera = this.playerViewModel.object.camera;
    const playerShip = this.spaceShipsModel.object.player;

    camera.position.copy(playerShip.position);
    camera.setRotationFromQuaternion(new THREE.Quaternion().copy(playerShip.orientation).normalize());

    super.execute();
  }
}
