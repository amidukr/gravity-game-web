import { ShaderMaterial, Vector3 } from "three";
import { preprocessShader } from "../utils/ShaderUtils";
import vertexShaderVs from "./glsl/GridShaderVertex.vs";
import fragmentFs from "./glsl/GridShaderFragment.fs";

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
    this.objectWorldScale = new Vector3(1, 1, 1);
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

  set objectWorldScale(value: Vector3) {
    this.uniforms["objectWorldScale"] = { value: value.toArray() };
  }
}
