import * as THREE from "three";
import { Application } from "../../../../../common/app/Application";
import { GameModel } from "../../../../../common/framework/game/model/GameModel";
import { ThreeJsRenderer } from "../../../../../common/framework/game/3rd-party/threejs/ThreeJsRenderer";
import { TYPE_GravityGameLevel } from "../../../level/GravityGameLevelObject";
import {
  GravityGameModelObject,
  TYPE_GravityGameModel,
} from "../../../model/GravityGameModelObject";
import { GameViewLoop } from "../../../../../common/framework/game/ui/view/GameViewLoop";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";

export class FreeFlyRenderingLoop implements GameViewLoop {
  private model!: GameModel<GravityGameModelObject>;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  start(gameView: GameView, application: Application) {
    this.model = application.getComponent(TYPE_GravityGameModel);
    this.renderer = application
      .getComponent(ThreeJsRenderer)
      .getThreeJsWebGlRenderer();

    const gameLevel = application.getComponent(TYPE_GravityGameLevel);

    this.scene = new THREE.Scene();
    this.scene.add(gameLevel.object.rootScene);
    this.scene.background = gameLevel.object.backhroundTexture;

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.000001,
      1000
    );

    this.renderer.physicallyCorrectLights = true;
  }

  execute() {
    this.camera.position.copy(this.model.object.spaceShips.player.position);
    this.camera.setRotationFromQuaternion(
      new THREE.Quaternion().copy(this.model.object.viewQuaternion).normalize()
    );

    this.renderer.render(this.scene, this.camera);
  }
}
