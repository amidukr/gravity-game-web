import { Object3D } from "three";

export function findObject3dParent(obj: Object3D, predicate: (x: Object3D) => boolean): Object3D | null {
  var parent = obj.parent;

  while (parent != null) {
    if (predicate(parent)) return parent;

    parent = obj.parent;
  }

  return null;
}
