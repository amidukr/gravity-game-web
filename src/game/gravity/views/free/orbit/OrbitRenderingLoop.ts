import { Box3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { TYPE_GravityGameLevel } from "../../../level/GravityGameLevelObject";
import { BaseGravityViewRenderer } from "../../../loops/BaseGravityViewRenderer";

export class OrbitRenderingLoop extends BaseGravityViewRenderer {
  private controls!: OrbitControls;

  override startNewGame(application: ApplicationContainer) {
    super.startNewGame(application);

    const scene = application.getComponent(TYPE_GravityGameLevel).object.rootScene;

    this.controls = new OrbitControls(this.camera, this.engineRenderer.getThreeJsWebGlRenderer().domElement);

    const boundBox = new Box3().setFromObject(scene);

    this.camera.position.set(boundBox.min.x, boundBox.min.y, boundBox.min.z);
    this.controls.update();
  }

  override execute() {
    this.controls.update();

    super.execute();
  }
}
