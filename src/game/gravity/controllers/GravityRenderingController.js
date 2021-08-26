import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class GravityRenderingController {
  start(application) {
    this.renderer = application
      .getComponent("ThreeJsRenderer")
      .getThreeJsWebGlRenderer();
    const gameResources = application.getComponent("GameVisualResources");

    this.scene = new THREE.Scene();
    this.scene.add(gameResources.get().rootScene);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.renderer.physicallyCorrectLights = true;
  }

  execute() {
    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
