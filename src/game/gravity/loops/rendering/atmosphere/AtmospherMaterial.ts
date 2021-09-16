import { ShaderMaterial, Vector3 } from "three";
import backShaderFs from "./glsl/BackShader.fs";
import basicVertexShaderVs from "./glsl/BasicVertexShader.vs";
import { preprocessShader } from "./ShaderUtils";

export class AtmospherShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      vertexShader: preprocessShader(basicVertexShaderVs),
      fragmentShader: preprocessShader(backShaderFs),
    });
  }

  set starPosition(value: Vector3) {
    this.uniforms["starPosition"] = { value: value.toArray() };
  }

  set planetCenter(value: Vector3) {
    this.uniforms["planetCenter"] = { value: value.toArray() };
  }

  set planetRadius(value: number) {
    this.uniforms["planetRadius"] = { value: value };
  }

  set atmosphereHeight(value: number) {
    this.uniforms["atmosphereHeight"] = { value: value };
  }
}
