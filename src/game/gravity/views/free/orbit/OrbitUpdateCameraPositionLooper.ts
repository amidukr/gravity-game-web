import { Box3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameRenderer } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameRenderer";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { BaseGameSceneUpdateLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";

export class OrbitUpdateCameraPositionLooper extends BaseGameSceneUpdateLooper {
  private controls!: OrbitControls;
  viewSceneModel!: ThreeJsGameViewSceneModel;
  gameRenderer!: ThreeJsGameRenderer;

  autowire(application: ApplicationContainer): void {
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
    this.gameRenderer = application.getComponent(ThreeJsGameRenderer);
  }

  override startNewGame() {
    super.startNewGame();

    const camera = this.viewSceneModel.object.camera;
    const scene = this.viewSceneModel.object.scene;

    this.controls = new OrbitControls(camera, this.gameRenderer.getThreeJsWebGlRenderer().domElement);

    const boundBox = new Box3().setFromObject(scene);

    camera.position.set(boundBox.min.x, boundBox.min.y, boundBox.min.z);
    this.controls.autoRotate = true;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.13;
    this.controls.update();
  }

  override execute() {
    this.controls.update();
  }
}
