import { ShaderMaterial } from "three";
import frontShaderFs from "./glsl/FrontShaderSphere.fs";
import frontShaderVs from "./glsl/FrontShader.vs";

export function createFrontShader(): ShaderMaterial {
  const shaderMaterial = new ShaderMaterial({
    transparent: true,
    vertexShader: frontShaderVs,
    fragmentShader: frontShaderFs,
  });

  return shaderMaterial;
}
