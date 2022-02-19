import { Box3, PerspectiveCamera, Vector2 } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEngineThreeJsRenderer } from "../../../common/game/engine/3rd-party/threejs/GameEngineThreeJsRenderer";
import { BaseGameLooper, TYPE_GameRenderingViewLoop } from "../../../common/game/engine/core/GameLooper";
import { GameLoopStarter, TYPE_GameLoopStarter } from "../../../common/game/engine/core/interface/GameStarter";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";
import { GravitySceneModel } from "../model/GravitySceneModel";
import { PlayerViewModel } from "../model/PlayerControlModel";
import { SpaceShipsModel } from "../model/SpaceShipsModel";

export abstract class BaseGravityViewRenderer extends BaseGameLooper implements GameLoopStarter {
  protected engineRenderer!: GameEngineThreeJsRenderer;
  protected gameLevel!: GravityGameLevel;

  protected scene!: THREE.Scene;

  sceneModel!: GravitySceneModel;
  spaceShipsModel!: SpaceShipsModel;
  playerViewModel!: PlayerViewModel;

  private clipPoints!: number[];
  application!: ApplicationContainer;

  constructor() {
    super(TYPE_GameRenderingViewLoop);
    Introspection.bindInterfaceName(this, TYPE_GameLoopStarter);
  }

  override autowire(application: ApplicationContainer): void {
    this.application = application;
  }

  startNewGame(): void {
    const application = this.application;
    this.engineRenderer = application.getComponent(GameEngineThreeJsRenderer);

    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);

    this.sceneModel = application.getComponent(GravitySceneModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
    this.playerViewModel = application.getComponent(PlayerViewModel);

    const threeJsRenderer = this.engineRenderer.getThreeJsWebGlRenderer();

    this.scene = this.sceneModel.object.scene;

    this.scene.add(this.gameLevel.object.rootScene);
    this.scene.background = this.gameLevel.object.backhroundTexture;

    this.playerViewModel.object.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.000001, 1000);

    threeJsRenderer.physicallyCorrectLights = true;

    const boundBox = new Box3().setFromObject(this.scene);

    const sceneScale = Math.max(boundBox.max.x - boundBox.min.x, boundBox.max.y - boundBox.min.y, boundBox.max.z - boundBox.min.z);

    const scaleDigits = Math.log10(sceneScale * 10);

    this.clipPoints = [1, Math.pow(10, scaleDigits / 2), Math.pow(10, scaleDigits)];
  }

  execute(): void {
    const threeJsRenderer = this.engineRenderer.getThreeJsWebGlRenderer();
    const camera = this.playerViewModel.object.camera;

    threeJsRenderer.autoClear = false;

    const vec = threeJsRenderer.getSize(new Vector2());
    camera.aspect = vec.x / vec.y;

    this.scene.background = this.gameLevel.object.backhroundTexture;

    camera.near = this.clipPoints[this.clipPoints.length - 2];
    camera.far = this.clipPoints[this.clipPoints.length - 1];
    camera.updateProjectionMatrix();

    threeJsRenderer.clearDepth();
    threeJsRenderer.render(this.scene, camera);

    this.scene.background = null;

    for (var i = this.clipPoints.length - 3; i >= 0; i--) {
      camera.near = this.clipPoints[i];
      camera.far = this.clipPoints[i + 1] * 1.1;
      camera.updateProjectionMatrix();

      threeJsRenderer.clearDepth();
      threeJsRenderer.render(this.scene, camera);
    }
  }
}
