import { Camera, Scene } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { LifecycleStage } from "../../../../../common/app/utils/LifecycleStage";
import { ThreeJsTaggedController } from "../../../../../common/game/engine/3rd-party/threejs/scene-graph-controller/ThreeJsTaggedController";
import { ThreeJsGameRenderer } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameRenderer";
import { ThreeJsSceneTagIndex } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTagIndex";
import { BaseGameRenderingLooper, GameLooperExecutionOrder } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";

export class GravityCloseSpaceRenderer extends BaseGameRenderingLooper {
  static ExecutionOrder = LifecycleStage.runAfter(GameLooperExecutionOrder.GamePreRenderingLooper);

  enabled: Boolean = false;
  scene: Scene = new Scene();
  camera!: Camera;
  taggedController!: ThreeJsTaggedController;
  engineRenderer!: ThreeJsGameRenderer;

  override executionOrder() {
    return GravityCloseSpaceRenderer.ExecutionOrder;
  }

  override autowire(application: ApplicationContainer): void {
    this.engineRenderer = application.getComponent(ThreeJsGameRenderer);
    this.taggedController = new ThreeJsTaggedController();

    this.taggedController.autowire(application);
    this.taggedController.tagIndex = new ThreeJsSceneTagIndex();
  }

  override startNewGame(): void | Promise<void> {}

  override execute(event: GameEvent): void {
    if (!this.enabled) return;

    this.taggedController.preRender({
      scene: this.scene,
    });

    const threeJsRenderer = this.engineRenderer.getThreeJsWebGlRenderer();

    threeJsRenderer.autoClear = false;

    threeJsRenderer.clearDepth();
    threeJsRenderer.render(this.scene, this.camera);
  }
}
