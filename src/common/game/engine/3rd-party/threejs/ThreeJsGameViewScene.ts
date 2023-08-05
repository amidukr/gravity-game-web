import { Camera, Scene } from "three";
import { BaseGameState } from "../../core/GameModel";
import { sceneObjectTag } from "../../features/rendering/SceneTaggingModel";
import { threeJsSetTagName } from "./ThreeJsSceneTaggingModel";

export const TAG_Root = sceneObjectTag<Scene>("Tag:Root");

export class ThreeJsGameViewSceneObject {
  scene = new Scene();
  camera!: Camera;
}

export class ThreeJsGameViewSceneModel extends BaseGameState<ThreeJsGameViewSceneObject> {
  construtNewObject() {
    const sceneObject = new ThreeJsGameViewSceneObject();
    threeJsSetTagName(sceneObject.scene, TAG_Root);
    sceneObject.scene.name = "TagRoot";

    return sceneObject;
  }
}
