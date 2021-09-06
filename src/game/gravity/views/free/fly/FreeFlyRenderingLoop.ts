import * as THREE from "three";
import { Vector2 } from "three";
import { BaseGravityViewRenderer } from "../../../loops/BaseGravityViewRenderer";

export class FreeFlyRenderingLoop extends BaseGravityViewRenderer {
  override execute() {
    const vec = this.engineRenderer.getThreeJsWebGlRenderer().getSize(new Vector2());
    this.camera.aspect = vec.x / vec.y;

    this.camera.position.copy(this.model.object.spaceShips.player.position);
    this.camera.setRotationFromQuaternion(new THREE.Quaternion().copy(this.model.object.view.quaternion).normalize());

    super.execute();
  }
}
