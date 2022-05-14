import { Vector3 } from "three";
import { BaseGameModel } from "../../../../../../common/game/engine/framework/GameModelTypes";

export const GRAVITY_OBJECT_UNIVERSE: string = "Universe";

export interface GravityObject {
  objectId: string;
  objectType: string;
  parentObjectId: string;

  mass: number;

  initialPosition: Vector3;

  orbitAngularVelocity: number;
  orbitRotationAxis: Vector3;

  lastCalculatedTimeMilliseconds: number;
  currentPosition: Vector3;
}

export class A {
  constructor(b: string, c: string) {}
}

export class GravityUniverse {
  gravityObjectsByName: { [objectId: string]: GravityObject } = {};
  gravityObjectsChildren: { [objectId: string]: GravityObject[] } = {};
}

export class GravityUniverseModel extends BaseGameModel<GravityUniverse> {
  construtNewObject(): GravityUniverse {
    return new GravityUniverse();
  }

  getGravityObjectList(): GravityObject[] {
    return Object.values(this.object.gravityObjectsByName);
  }

  getGravityObject(name: string): GravityObject {
    return this.object.gravityObjectsByName[name];
  }

  addGravityObject(gravityObject: GravityObject) {
    const gravityUniverse = this.object;
    gravityUniverse.gravityObjectsByName[gravityObject.objectId] = gravityObject;

    const parentChildren =
      gravityUniverse.gravityObjectsChildren[gravityObject.parentObjectId] || (gravityUniverse.gravityObjectsChildren[gravityObject.parentObjectId] = []);
    parentChildren.push(gravityObject);
  }
}
