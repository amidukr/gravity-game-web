import { Vector3 } from "three/src/math/Vector3";

/**
 * Universal sublocation inertia inertial frame reference object.
 */
export interface UssPhysicalBody {
  position: Vector3;
  velocity: Vector3;
}
