import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Application } from "../../../../../common/app/Application";
import { BaseGravityViewRenderer } from "../../../loops/BaseGravityViewRenderer";

export class OrbitRenderingLoop extends BaseGravityViewRenderer {
  private controls!: OrbitControls;

  override start(application: Application) {
    super.start(application);

    this.controls = new OrbitControls(this.camera, this.engineRenderer.getThreeJsWebGlRenderer().domElement);

    this.camera.position.set(7, 0, 7);
    this.controls.update();
  }

  override execute() {
    this.controls.update();

    super.execute();
  }
}
