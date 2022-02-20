import { Camera, Scene } from "three";
import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { BaseGameState } from "../../core/GameModel";
import { GameLoaderExecutionOrder } from "../../framework/GameLoaderTypes";

export class ThreeJsGameViewScene {
  scene = new Scene();
  camera!: Camera;
}

export class ThreeJsGameViewSceneModel extends BaseGameState<ThreeJsGameViewScene> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject() {
    return new ThreeJsGameViewScene();
  }
}
