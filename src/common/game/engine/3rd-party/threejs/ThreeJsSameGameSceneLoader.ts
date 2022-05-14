import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { BaseGameSceneLoader } from "../../../../../common/game/engine/framework/GameLoaderTypes";

export class ThreeJsSampleGameSceneLoader extends BaseGameSceneLoader {
  sceneModel!: ThreeJsGameViewSceneModel;

  autowire(application: ApplicationContainer): void {
    this.sceneModel = application.getComponent(ThreeJsGameViewSceneModel);
  }

  startNewGame(): void {
    const scene = this.sceneModel.object.scene;

    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    scene.add(cube);
  }
}
