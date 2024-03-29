export function preprocessShader(shader: string): string {
  const cutBeforeToken = "#pragma cut-beffore";

  const cutIndex = shader.indexOf(cutBeforeToken);
  if (cutIndex == -1) {
    return shader;
  }

  return shader.substr(cutIndex + cutBeforeToken.length);
}
