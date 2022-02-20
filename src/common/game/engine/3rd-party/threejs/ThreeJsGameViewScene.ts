import { Camera, Scene } from "three";
import { BaseGameState } from "../../core/GameModel";

export class ThreeJsGameViewScene {
  scene = new Scene();
  camera!: Camera;
}

export class ThreeJsGameViewSceneModel extends BaseGameState<ThreeJsGameViewScene> {
  construtNewObject() {
    return new ThreeJsGameViewScene();
  }
}
