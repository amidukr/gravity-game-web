import * as THREE from "three";
import { ApplicationComponentMeta } from "../../../app/lookup/ApplicationComponentMeta";

export class ThreeJsRenderer implements GameRenderer {
  private __renderer: THREE.WebGLRenderer;

  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, "GameRenderer");

    this.__renderer = new THREE.WebGLRenderer();
    this.__renderer.setSize(window.innerWidth, window.innerHeight);
  }

  getCanvasDomElement(): HTMLCanvasElement {
    return this.__renderer.domElement;
  }

  getThreeJsWebGlRenderer(): THREE.WebGLRenderer {
    return this.__renderer;
  }
}
