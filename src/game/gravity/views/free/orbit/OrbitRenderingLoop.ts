import * as THREE from "three";
import { Application } from "../../../../../common/app/Application";
import { GameModel } from "../../../../../common/framework/game/model/GameModel";
import { ThreeJsRenderer } from "../../../../../common/framework/game/3rd-party/threejs/ThreeJsRenderer";
import { TYPE_GravityGameLevel } from "../../../level/GravityGameLevelObject";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GravityGameModelObject, TYPE_GravityGameModel } from "../../../model/GravityGameModelObject";
import { GameViewLoop } from "../../../../../common/framework/game/ui/view/GameViewLoop";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";
import { Vector2 } from "three";

export class OrbitRenderingLoop implements GameViewLoop {
  private renderer!: ThreeJsRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  start(application: Application) {
    this.renderer = application.getComponent(ThreeJsRenderer);

    const gameLevel = application.getComponent(TYPE_GravityGameLevel);

    this.scene = new THREE.Scene();
    this.scene.add(gameLevel.object.rootScene);
    this.scene.background = gameLevel.object.backhroundTexture;

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.000001, 1000);

    this.renderer.getThreeJsWebGlRenderer().physicallyCorrectLights = true;

    this.controls = new OrbitControls(this.camera, this.renderer.getThreeJsWebGlRenderer().domElement);

    this.camera.position.set(7, 0, 7);
    this.controls.update();
  }

  execute() {
    const vec = this.renderer.getThreeJsWebGlRenderer().getSize(new Vector2());
    this.camera.aspect = vec.x / vec.y;
    this.camera.updateProjectionMatrix();

    this.controls.update();

    this.renderer.getThreeJsWebGlRenderer().render(this.scene, this.camera);
  }
}
