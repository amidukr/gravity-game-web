import { Camera, Scene } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { LifecycleStage } from "../../../../../common/app/utils/LifecycleStage";
import { ThreeJsGameRenderer } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameRenderer";
import { BaseGameRenderingLooper, GameLooperExecutionOrder } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";
import { ThreeJsTaggedController } from "../../../../../common/game/engine/3rd-party/threejs/scene-graph-controller/ThreeJsTaggedController";

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

    this.taggedController.setup(application);
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
