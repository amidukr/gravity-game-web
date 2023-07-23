import { Event, Object3D } from "three";
import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { LifecycleStage } from "../../../../app/utils/LifecycleStage";
import { GameSceneObjectMetaModel, gameSceneObjectTag, TYPE_GameSceneObjectMetaModel } from "../../features/rendering/GameSceneObjectMeta";
import { BaseGameSceneLoader, GameLoaderExecutionOrder } from "../../framework/GameLoaderTypes";
import { ThreeJsGameLevel } from "./objects/ThreeJsGameLevelObject";
import { ThreeJsGameViewSceneModel } from "./ThreeJsGameViewScene";

export class ThreeJsSceneMetaTagIndexer extends BaseGameSceneLoader {
  gameLevel!: ThreeJsGameLevel;
  sceneModel!: ThreeJsGameViewSceneModel;
  metaModel!: GameSceneObjectMetaModel;

  override executionOrder(): LifecycleStage {
    return GameLoaderExecutionOrder.GameSceneIndexer;
  }

  autowire(application: ApplicationContainer): void {
    this.sceneModel = application.getComponent(ThreeJsGameViewSceneModel);
    this.metaModel = application.getComponent(TYPE_GameSceneObjectMetaModel);
  }

  startNewGame(): void {
    const scene = this.sceneModel.object.scene;

    scene.traverse((o) => {
      this.indexObject(o);
    });
  }

  indexObject(o: Object3D<Event>) {
    const name: string = o.userData.name;

    if (!name || !name.startsWith("Tag:")) return;

    const pointIndexOf = name.indexOf(".");

    this.metaModel.addTagToObject(o, gameSceneObjectTag(name), gameSceneObjectTag(name.substring(0, pointIndexOf)));
  }
}
