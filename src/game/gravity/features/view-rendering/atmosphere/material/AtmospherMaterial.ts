import { ShaderMaterial, Vector3 } from "three";
import { preprocessShader } from "../../../../../../common/utils/ShaderUtils";
import backShaderFs from "./glsl/BackShader.fs";
import basicVertexShaderVs from "./glsl/BasicVertexShader.vs";

export class AtmospherShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      vertexShader: preprocessShader(basicVertexShaderVs),
      fragmentShader: preprocessShader(backShaderFs),
    });

    this.planetCenter = new Vector3();
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
