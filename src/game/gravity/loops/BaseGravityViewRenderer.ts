import { Box3, PerspectiveCamera, Scene, Vector2 } from "three";
import { Application } from "../../../common/app/Application";
import { GameEngineThreeJsRenderer } from "../../../common/framework/game/3rd-party/threejs/GameEngineThreeJsRenderer";
import { GameViewLoop } from "../../../common/framework/game/ui/view/GameViewLoop";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";
import { GravityGameModel, TYPE_GravityGameModel } from "../model/GravityGameModelObject";

export abstract class BaseGravityViewRenderer implements GameViewLoop {
  protected engineRenderer!: GameEngineThreeJsRenderer;
  protected gameLevel!: GravityGameLevel;

  protected scene!: THREE.Scene;
  protected camera!: THREE.PerspectiveCamera;

  protected model!: GravityGameModel;

  private clipPoints!: number[];

  start(application: Application): void {
    this.engineRenderer = application.getComponent(GameEngineThreeJsRenderer);
    const threeJsRenderer = this.engineRenderer.getThreeJsWebGlRenderer();
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.model = application.getComponent(TYPE_GravityGameModel);

    this.scene = new Scene();

    this.scene.clear();

    this.scene.add(this.gameLevel.object.rootScene);
    this.scene.background = this.gameLevel.object.backhroundTexture;

    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.000001, 1000);

    threeJsRenderer.physicallyCorrectLights = true;

    const boundBox = new Box3().setFromObject(this.scene);

    const sceneScale = Math.max(
      boundBox.max.x - boundBox.min.x,
      boundBox.max.y - boundBox.min.y,
      boundBox.max.z - boundBox.min.z
    );

    const scaleDigits = Math.log10(sceneScale * 10);

    this.clipPoints = [1, Math.pow(10, scaleDigits / 2), Math.pow(10, scaleDigits)];
  }

  execute(): void {
    const threeJsRenderer = this.engineRenderer.getThreeJsWebGlRenderer();

    threeJsRenderer.autoClear = false;

    const vec = threeJsRenderer.getSize(new Vector2());
    this.camera.aspect = vec.x / vec.y;

    this.scene.background = this.gameLevel.object.backhroundTexture;
    this.camera.near = this.clipPoints[this.clipPoints.length - 2];
    this.camera.far = this.clipPoints[this.clipPoints.length - 1];
    this.camera.updateProjectionMatrix();

    threeJsRenderer.clearDepth();
    threeJsRenderer.render(this.scene, this.camera);

    this.scene.background = null;

    for (var i = this.clipPoints.length - 3; i >= 0; i--) {
      this.camera.near = this.clipPoints[i];
      this.camera.far = this.clipPoints[i + 1] * 1.1;
      this.camera.updateProjectionMatrix();

      threeJsRenderer.clearDepth();
      threeJsRenderer.render(this.scene, this.camera);
    }
  }
}
