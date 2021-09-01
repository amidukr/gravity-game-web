import * as THREE from "three";
import { ApplicationComponentMeta } from "../../../app/lookup/ApplicationComponentMeta";
import { GameRenderer, TYPE_GameRenderer } from "./GameRenderer";

export class ThreeJsRenderer implements GameRenderer {
  private __renderer: THREE.WebGLRenderer;

  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_GameRenderer);

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
