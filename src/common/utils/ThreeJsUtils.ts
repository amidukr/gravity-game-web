import { Object3D, Quaternion, Vector3 } from "three";
import { quanterionBaseVector } from "../game/engine/3rd-party/threejs/Constants";

export function findObject3dParent(obj: Object3D, predicate: (x: Object3D) => boolean): Object3D | null {
  var parent = obj.parent;

  while (parent != null) {
    if (predicate(parent)) return parent;

    parent = parent.parent;
  }

  return null;
}


export function alignQuaternionToVector(quaternion: Quaternion, newOrientation: Vector3): Quaternion {
  const qVector = quanterionBaseVector().applyQuaternion(quaternion)
  
  return quaternion.copy(new Quaternion().setFromUnitVectors(qVector.normalize(), newOrientation.clone().normalize()).multiply(quaternion))
}
