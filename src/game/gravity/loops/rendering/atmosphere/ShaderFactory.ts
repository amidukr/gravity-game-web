import { ShaderMaterial } from "three";
import frontShaderVs from "./glsl/FrontShader.vs";
import frontShaderFs from "./glsl/FrontShaderSphere.fs";

export function createFrontShader(): ShaderMaterial {
  const shaderMaterial = new ShaderMaterial({
    transparent: true,
    vertexShader: frontShaderVs,
    fragmentShader: frontShaderFs,
  });

  return shaderMaterial;
}
