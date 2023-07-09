import { Vector3 } from "three";

export function calculateGravityObjectVelocity(gravityObject: {
  currentPosition: Vector3;
  orbitRotationAxis: Vector3;
  orbitAngularVelocity: number;
  orbitRadius: number;
}) {
  if (gravityObject.orbitAngularVelocity == 0) return new Vector3();

  const scalarVelocity = gravityObject.orbitRadius * gravityObject.orbitAngularVelocity;

  return gravityObject.currentPosition
    .clone()
    .setLength(scalarVelocity)
    .applyAxisAngle(gravityObject.orbitRotationAxis, Math.PI / 2)
    .multiplyScalar(1.0 / 1000); // velocity is given in seconds
}
