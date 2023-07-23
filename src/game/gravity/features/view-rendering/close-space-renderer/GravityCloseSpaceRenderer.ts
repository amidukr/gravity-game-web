import { Camera, Scene } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { LifecycleStage } from "../../../../../common/app/utils/LifecycleStage";
import { SceneTaggedController } from "../../../../../common/game/engine/3rd-party/threejs/scene-graph-controller/SceneTaggedController";
import { ThreeJsGameRenderer } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameRenderer";
import { ThreeJsSceneTaggingModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { BaseGameRenderingLooper, GameLooperExecutionOrder } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";

export class GravityCloseSpaceRenderer extends BaseGameRenderingLooper {
  static ExecutionOrder = LifecycleStage.runAfter(GameLooperExecutionOrder.GamePreRenderingLooper);

  enabled: Boolean = false;
  scene: Scene = new Scene();
  camera!: Camera;
  taggedController!: SceneTaggedController;
  taggingModel = new ThreeJsSceneTaggingModel();
  engineRenderer!: ThreeJsGameRenderer;

  override executionOrder() {
    return GravityCloseSpaceRenderer.ExecutionOrder;
  }

  override autowire(application: ApplicationContainer): void {
    this.engineRenderer = application.getComponent(ThreeJsGameRenderer);
    this.taggedController = new SceneTaggedController();

    this.taggedController.autowire(application);
    this.taggedController.taggingModel = this.taggingModel;
  }

  override startNewGame(): void | Promise<void> {}

  override execute(event: GameEvent): void {
    if (!this.enabled) return;

    this.taggingModel.reindex(this.scene);
    this.taggedController.preRender();

    const threeJsRenderer = this.engineRenderer.getThreeJsWebGlRenderer();

    threeJsRenderer.autoClear = false;

    threeJsRenderer.clearDepth();
    threeJsRenderer.render(this.scene, this.camera);
  }
}
