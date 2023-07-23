import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { LifecycleStage } from "../../../../app/utils/LifecycleStage";
import { BaseGameSceneLoader, GameLoaderExecutionOrder } from "../../framework/GameLoaderTypes";
import { ThreeJsGameLevel, TYPE_ThreeJsGameLevel } from "./objects/ThreeJsGameLevelObject";
import { ThreeJsGameViewSceneModel } from "./ThreeJsGameViewScene";
import { ThreeJsSceneTaggingModel } from "./ThreeJsSceneTaggingModel";

export class ThreeJsRootSceneLoader extends BaseGameSceneLoader {
  gameLevel!: ThreeJsGameLevel;
  sceneModel!: ThreeJsGameViewSceneModel;
  tagIndex!: ThreeJsSceneTaggingModel;

  override executionOrder(): LifecycleStage {
    return GameLoaderExecutionOrder.GameRootSceneLoader;
  }

  autowire(application: ApplicationContainer): void {
    this.sceneModel = application.getComponent(ThreeJsGameViewSceneModel);
    this.gameLevel = application.getComponent(TYPE_ThreeJsGameLevel);
    this.tagIndex = application.getComponent(ThreeJsSceneTaggingModel);
  }

  startNewGame(): void {
    const scene = this.sceneModel.object.scene;

    scene.add(this.gameLevel.object.rootScene);

    this.tagIndex.reindex(scene);
  }
}
