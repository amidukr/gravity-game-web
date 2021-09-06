import * as THREE from "three";
import { Introspection } from "../../../../app/lookup/Introspection";
import { GameRenderer, TYPE_GameRenderer } from "../../rendering/GameRenderer";

export class ThreeJsRenderer implements GameRenderer {
  private __renderer: THREE.WebGLRenderer;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameRenderer);

    this.__renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.__renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => this.__renderer.setSize(window.innerWidth, window.innerHeight));
  }

  getCanvasDomElement(): HTMLCanvasElement {
    return this.__renderer.domElement;
  }

  getThreeJsWebGlRenderer(): THREE.WebGLRenderer {
    return this.__renderer;
  }
}
