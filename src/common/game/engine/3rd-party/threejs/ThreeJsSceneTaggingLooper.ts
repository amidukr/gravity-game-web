import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { TaggedSceneEngine } from "../../features/rendering/scene-graph-controller/TaggedSceneEngine";
import { BaseGameSceneTaggingLooper } from "../../framework/GameLooperTypes";
import { GameEvent } from "../../GameEvent";
import { ThreeJsGameViewSceneModel } from "./ThreeJsGameViewScene";
import { ThreeJsSceneTaggingModel } from "./ThreeJsSceneTaggingModel";

export class ThreeJsTaggedScenePrerender extends BaseGameSceneTaggingLooper {
  taggingModel!: ThreeJsSceneTaggingModel;
  sceneTaggedController!: TaggedSceneEngine;
  viewSceneModel!: ThreeJsGameViewSceneModel;

  override autowire(application: ApplicationContainer): void {
    this.taggingModel = application.getComponent(ThreeJsSceneTaggingModel);
    this.sceneTaggedController = application.getComponent(TaggedSceneEngine);
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
  }

  override execute(event: GameEvent): void {
    this.sceneTaggedController.preRender();
  }
}
