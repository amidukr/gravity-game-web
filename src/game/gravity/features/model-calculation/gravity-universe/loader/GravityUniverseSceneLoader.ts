import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneModel } from "../../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { GameSceneObjectMetaModel } from "../../../../../../common/game/engine/features/rendering/GameSceneObjectMeta";
import { BaseGameSceneLoader } from "../../../../../../common/game/engine/framework/GameLoaderTypes";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../../game-level/GravityGameLevelObject";
import { GRAVITY_UNIVERSE_OBJECT } from "../GravityUniverse";
import { GravityUniverseModel } from "../model/GravityUniverseModel";

// TODO: remove this class

export class GravityUniverseSceneLoader extends BaseGameSceneLoader {
  sceneModel!: ThreeJsGameViewSceneModel;
  gravityUniverseModel!: GravityUniverseModel;
  gameLevel!: GravityGameLevel;
  scenObjectMetaModel!: GameSceneObjectMetaModel;

  autowire(application: ApplicationContainer): void {
    this.sceneModel = application.getComponent(ThreeJsGameViewSceneModel);
    this.gravityUniverseModel = application.getComponent(GravityUniverseModel);
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.scenObjectMetaModel = application.getComponent(GameSceneObjectMetaModel);
  }

  startNewGame(): void {
    const gameScene = this.sceneModel.object.scene;

    const gravityObjectList = this.gravityUniverseModel.getGravityObjectList();
    const levelScene = this.gameLevel.object.rootScene;

    for (const gravityObject of gravityObjectList) {
      const sceneObject = levelScene.getObjectByName(gravityObject.objectId)!!.clone();

      this.scenObjectMetaModel.addTagToObject(sceneObject, GRAVITY_UNIVERSE_OBJECT);

      gameScene.add(sceneObject);
    }
  }
}
