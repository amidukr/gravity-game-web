import { Camera, Scene } from "three";
import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { BaseGameModel } from "../../core/GameModel";
import { GameLoaderExecutionOrder } from "../../framework/GameLoaderTypes";

export class ThreeJsGameViewScene {
  scene = new Scene();
  camera!: Camera;
}

export class ThreeJsGameViewSceneModel extends BaseGameModel<ThreeJsGameViewScene> {
  executionOrder(): number {
    return GameLoaderExecutionOrder.GameSceneModelLoader;
  }

  autowire(application: ApplicationContainer): void {}

  construtNewObject() {
    return new ThreeJsGameViewScene();
  }
}
