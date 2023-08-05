/*import { ShaderMaterial, Vector3 } from "three";
import basicVertexShaderVs from "../../../../../../common/shaders/BasicVertexShader.vs";
import { preprocessShader } from "../../../../../../common/utils/ShaderUtils";
import backShaderFs from "./glsl/TerraShader.fs";

export class TerraShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      transparent: true,
      vertexShader: preprocessShader(basicVertexShaderVs),
      fragmentShader: preprocessShader(backShaderFs),
    });

    this.scale = 1.0;
    this.gridBlend = 0.5;
    this.subLocationCenter = new Vector3();
    this.planetCenter = new Vector3();
  }

  set scale(value: number) {
    this.uniforms["scale"] = { value: value };
  }

  set gridBlend(value: number) {
    this.uniforms["gridBlend"] = { value: value };
  }

  set subLocationCenter(value: Vector3) {
    this.uniforms["subLocationCenter"] = { value: value.toArray() };
  }

  set planetCenter(value: Vector3) {
    this.uniforms["planetCenter"] = { value: value.toArray() };
  }
}*/
