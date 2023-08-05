import { ShaderMaterial, Vector3 } from "three";
import vertexShaderVs from "../../../../../../common/materials/glsl/BasicVertexShader.vs";
import { preprocessShader } from "../../../../../../common/utils/ShaderUtils";
import fragmentShader from "./glsl/BackShader.fs";

export class AtmospherShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      vertexShader: preprocessShader(vertexShaderVs),
      fragmentShader: preprocessShader(fragmentShader),
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
