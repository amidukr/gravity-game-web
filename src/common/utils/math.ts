export function clamp(x: number, edge0: number, edge1: number): number {
  return Math.min(Math.max(x, edge0), edge1);
}

export function clampToOne(x: number): number {
  return clamp(x, 0, 1);
}

export function expSteepness(value: number, steepness: number): number {
  return steepness == 1.0 ? value : (Math.pow(steepness, value) - 1.0) / (steepness - 1.0);
}

export function smootStep(x: number, edge0: number, edge1: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}
