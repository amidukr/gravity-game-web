import { Box3, PerspectiveCamera, Vector2 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameRenderer } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameRenderer";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { BaseGameRenderingLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../../model-calculation/game-level/GravityGameLevelObject";

export class GravitySceneRenderer extends BaseGameRenderingLooper {
  application!: ApplicationContainer;

  viewSceneModel!: ThreeJsGameViewSceneModel;
  protected engineRenderer!: ThreeJsGameRenderer;

  protected gameLevel!: GravityGameLevel;

  private clipPoints!: number[];

  override autowire(application: ApplicationContainer): void {
    this.application = application;
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
    this.engineRenderer = application.getComponent(ThreeJsGameRenderer);

    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
  }

  override startNewGame(): void {
    const application = this.application;

    const threeJsRenderer = this.engineRenderer.getThreeJsWebGlRenderer();

    const scene = this.viewSceneModel.object.scene;

    //scene.add(this.gameLevel.object.rootScene);
    scene.background = this.gameLevel.object.backhroundTexture;

    this.viewSceneModel.object.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.000001, 1000);

    threeJsRenderer.physicallyCorrectLights = true;

    const boundBox = new Box3().setFromObject(scene);

    const sceneScale = Math.max(boundBox.max.x - boundBox.min.x, boundBox.max.y - boundBox.min.y, boundBox.max.z - boundBox.min.z);

    const scaleDigits = Math.log10(sceneScale * 10);

    this.clipPoints = [1, Math.pow(10, scaleDigits / 2), Math.pow(10, scaleDigits)];
  }

  execute(): void {
    const threeJsRenderer = this.engineRenderer.getThreeJsWebGlRenderer();
    const camera = this.viewSceneModel.object.camera as PerspectiveCamera;
    const scene = this.viewSceneModel.object.scene;

    threeJsRenderer.autoClear = false;

    const vec = threeJsRenderer.getSize(new Vector2());
    camera.aspect = vec.x / vec.y;

    scene.background = this.gameLevel.object.backhroundTexture;

    camera.near = this.clipPoints[this.clipPoints.length - 2];
    camera.far = this.clipPoints[this.clipPoints.length - 1];
    camera.updateProjectionMatrix();

    threeJsRenderer.clearDepth();
    threeJsRenderer.render(scene, camera);

    scene.background = null;

    for (var i = this.clipPoints.length - 3; i >= 0; i--) {
      camera.near = this.clipPoints[i];
      camera.far = this.clipPoints[i + 1] * 1.1;
      camera.updateProjectionMatrix();

      threeJsRenderer.clearDepth();
      threeJsRenderer.render(scene, camera);
    }
  }
}
