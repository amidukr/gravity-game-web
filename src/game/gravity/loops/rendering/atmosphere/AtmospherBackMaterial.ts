import { Color, ShaderMaterial, Vector3 } from "three";
import backShaderFs from "./glsl/BackShader.fs";
import basicVertexShaderVs from "./glsl/BasicVertexShader.vs";
import { preprocessShader } from "./ShaderUtils";

export class AtmospherBackShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      vertexShader: preprocessShader(basicVertexShaderVs),
      fragmentShader: preprocessShader(backShaderFs),
    });

    this.atmosphereColor = new Color(0.3, 0.3, 1.0);
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

  set atmosphereColor(value: Color) {
    this.uniforms["atmosphereColor"] = { value: value.toArray() };
  }

  set atmosphereInvisibleDepth(value: number) {
    this.uniforms["atmosphereInvisibleDepth"] = { value: value };
  }
}
