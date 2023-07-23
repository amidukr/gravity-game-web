import { Camera, Scene } from "three";
import { BaseGameState } from "../../core/GameModel";
import { sceneObjectTag } from "../../features/rendering/SceneTaggingModel";

export const TAG_Root = sceneObjectTag("Tag:Root");

export class ThreeJsGameViewSceneObject {
  scene = new Scene();
  camera!: Camera;
}

export class ThreeJsGameViewSceneModel extends BaseGameState<ThreeJsGameViewSceneObject> {
  construtNewObject() {
    const sceneObject = new ThreeJsGameViewSceneObject();
    sceneObject.scene.name = "TagRoot";
    sceneObject.scene.userData.name = TAG_Root.name;

    return sceneObject;
  }
}
