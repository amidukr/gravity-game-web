import { Camera, Scene } from "three";
import { BaseGameState } from "../../core/GameModel";

export class ThreeJsGameViewSceneObject {
  scene = new Scene();
  camera!: Camera;
}

export class ThreeJsGameViewSceneModel extends BaseGameState<ThreeJsGameViewSceneObject> {
  construtNewObject() {
    return new ThreeJsGameViewSceneObject();
  }
}
