import * as THREE from "three";
import { ApplicationComponentMeta } from "../../../app/lookup/ApplicationComponentMeta";

export class ThreeJsRenderer {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, "GameRenderer");

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  getCanvasDomElement() {
    return this.renderer.domElement;
  }

  getThreeJsWebGlRenderer() {
    return this.renderer;
  }
}
