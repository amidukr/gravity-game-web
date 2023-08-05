import { ShaderMaterial, Vector3 } from "three";
import { preprocessShader } from "../utils/ShaderUtils";
import vertexShaderVs from "./glsl/BasicVertexShader.vs";
import fragmentFs from "./glsl/GridShader.fs";

export class GridShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      vertexShader: preprocessShader(vertexShaderVs),
      fragmentShader: preprocessShader(fragmentFs),
    });

    this.scale = 1.0;
    this.gridBlend = 0.5;
    this.objectCenter = new Vector3();
  }

  set scale(value: number) {
    this.uniforms["scale"] = { value: value };
  }

  set gridBlend(value: number) {
    this.uniforms["gridBlend"] = { value: value };
  }

  set objectCenter(value: Vector3) {
    this.uniforms["objectCenter"] = { value: value.toArray() };
  }
}
