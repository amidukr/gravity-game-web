import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { BaseGameSceneTaggingLooper } from "../../framework/GameLooperTypes";
import { GameEvent } from "../../GameEvent";
import { SceneTaggedController } from "./scene-graph-controller/SceneTaggedController";
import { ThreeJsGameViewSceneModel } from "./ThreeJsGameViewScene";
import { ThreeJsSceneTaggingModel } from "./ThreeJsSceneTaggingModel";

export class ThreeJsTaggedScenePrerender extends BaseGameSceneTaggingLooper {
  taggingModel!: ThreeJsSceneTaggingModel;
  sceneTaggedController!: SceneTaggedController;
  viewSceneModel!: ThreeJsGameViewSceneModel;

  override autowire(application: ApplicationContainer): void {
    this.taggingModel = application.getComponent(ThreeJsSceneTaggingModel);
    this.sceneTaggedController = application.getComponent(SceneTaggedController);
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
  }

  override execute(event: GameEvent): void {
    this.taggingModel.reindex(this.viewSceneModel.object.scene);
    this.sceneTaggedController.preRender();
  }
}
