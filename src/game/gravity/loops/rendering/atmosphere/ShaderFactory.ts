import { ShaderMaterial } from "three";
import frontShaderFs from "./glsl/FrontShader.fs";
import frontShaderVs from "./glsl/FrontShader.vs";

export function createFrontShader(): ShaderMaterial {
  const shaderMaterial = new ShaderMaterial({
    transparent: true,
    vertexShader: frontShaderVs,
    fragmentShader: frontShaderFs,
  });

  return shaderMaterial;
}
