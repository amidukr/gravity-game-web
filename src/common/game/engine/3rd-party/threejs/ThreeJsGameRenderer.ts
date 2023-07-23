import * as THREE from "three";
import { WebGLRendererParameters } from "three";
import { Introspection } from "../../../../app/lookup/Introspection";
import { Renderer, TYPE_Renderer } from "../../features/rendering/Renderer";

export interface ThreeJsRendererConfiguration {
  webGlRenderingParameters?: WebGLRendererParameters;
  keepCanvasWidnowsSize?: boolean;
}

export class ThreeJsGameRenderer implements Renderer {
  private __renderer: THREE.WebGLRenderer;

  constructor(param?: ThreeJsRendererConfiguration) {
    Introspection.bindInterfaceName(this, TYPE_Renderer);

    this.__renderer = new THREE.WebGLRenderer(param?.webGlRenderingParameters);

    if (param?.keepCanvasWidnowsSize == undefined || param?.keepCanvasWidnowsSize) {
      this.__renderer.setSize(window.innerWidth, window.innerHeight);

      window.addEventListener("resize", () => this.__renderer.setSize(window.innerWidth, window.innerHeight));
    }
  }

  getCanvasDomElement(): HTMLCanvasElement {
    return this.__renderer.domElement;
  }

  getThreeJsWebGlRenderer(): THREE.WebGLRenderer {
    return this.__renderer;
  }
}
