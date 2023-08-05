import { Object3D } from "three";
import { threeJsIsTaggged } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { findObject3dParent } from "../../../../../common/utils/ThreeJsUtils";
import { TAG_GravityField } from "../../game-level/GravityGameTags";

const gravityFieldObjectMap = new WeakMap<Object3D, WeakRef<Object3D>>();
const planetTemplateMap = new WeakMap<Object3D, Object3D>();

export function findParentGravityField(object: Object3D): Object3D | null {
  return findObject3dParent(object, (p) => threeJsIsTaggged(p, TAG_GravityField));
}

export function getGravityFieldPlanet(gravityFieldObject: Object3D): Object3D | undefined {
  return gravityFieldObjectMap.get(gravityFieldObject)?.deref();
}

export function setGravityFieldPlanet(gravityFieldObject: Object3D, planet: Object3D): void {
  gravityFieldObjectMap.set(gravityFieldObject, new WeakRef(planet));
}

export function setPlanetRadius(planet: Object3D, radius: number): void {
  planet.userData.radius = radius;
}

export function getPlanetRadius(planet: Object3D): number {
  return planet.userData.radius;
}

export function saveOriginalObjectTemplate(object: Object3D) {
  planetTemplateMap.set(object, object.clone());
}

export function loadOriginalObjectTemplate(object: Object3D): Object3D {
  return planetTemplateMap.get(object)!!.clone();
}
