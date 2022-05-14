import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { LifecycleStage } from "../../../../app/utils/LifecycleStage";
import { BaseGameSceneLoader, GameLoaderExecutionOrder } from "../../framework/GameLoaderTypes";
import { ThreeJsGameLevel, TYPE_ThreeJsGameLevel } from "./objects/ThreeJsGameLevelObject";
import { ThreeJsGameViewSceneModel } from "./ThreeJsGameViewScene";

export class ThreeJsRootSceneLoader extends BaseGameSceneLoader {
  gameLevel!: ThreeJsGameLevel;
  sceneModel!: ThreeJsGameViewSceneModel;

  override executionOrder(): LifecycleStage {
    return GameLoaderExecutionOrder.GameRootSceneLoader;
  }

  autowire(application: ApplicationContainer): void {
    this.sceneModel = application.getComponent(ThreeJsGameViewSceneModel);
    this.gameLevel = application.getComponent(TYPE_ThreeJsGameLevel);
  }

  startNewGame(): void {
    const scene = this.sceneModel.object.scene;

    scene.add(this.gameLevel.object.rootScene);
  }
}
