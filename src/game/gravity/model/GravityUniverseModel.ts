import { Vector3 } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { LoadGameObject } from "../../../common/framework/game/loader/object/LoadGameObject";
import { BaseGameModel } from "../../../common/framework/game/model/BaseGameModel";
import { GameTimeModel } from "../../../common/framework/game/time/GameTimeModel";

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

export function newGravityObject(
  parent: GravityObject,
  child: {
    objectId: string;
    objectType: string;

    mass: number;

    initialPosition: Vector3;

    orbitAngularVelocity: number;
    orbitRotationAxis: Vector3;
  }
): GravityObject {
  const G = 1.0;

  const radius = child.initialPosition.length();

  let orbitRotationAxis: Vector3;
  let orbitAngularVelocity: number;

  if (radius >= 0) {
    orbitRotationAxis = new Vector3(child.initialPosition.y, 0, child.initialPosition.x).cross(child.initialPosition);
    orbitAngularVelocity = Math.sqrt(G * parent.mass) / Math.pow(radius, 1.5);
  } else {
    orbitRotationAxis = new Vector3(0, 1, 0);
    orbitAngularVelocity = 0;
  }

  return {
    objectId: child.objectId,
    objectType: child.objectType,
    parentObjectId: parent.objectId,

    mass: child.mass,

    initialPosition: child.initialPosition,
    orbitRotationAxis: orbitRotationAxis,
    orbitAngularVelocity: orbitAngularVelocity,

    lastCalculatedTimeMilliseconds: 0,
    currentPosition: child.initialPosition,
  };
}

export class GravityUniverse {
  gravityObjectsByName: { [objectId: string]: GravityObject } = {};
  gravityObjectsChildren: { [objectId: string]: GravityObject[] } = {};
}

export class GravityUniverseModel extends BaseGameModel<GravityUniverse> {
  gameTimeModel!: GameTimeModel;

  autowire(application: ApplicationContainer): void {
    this.gameTimeModel = application.getComponent(GameTimeModel);
  }

  construtNewObject(loadGameObject: LoadGameObject): GravityUniverse {
    return new GravityUniverse();
  }

  addGravityObject(gravityObject: GravityObject) {
    const gravityUniverse = this.object;
    gravityUniverse.gravityObjectsByName[gravityObject.objectId] = gravityObject;

    const parentChildren =
      gravityUniverse.gravityObjectsChildren[gravityObject.parentObjectId] ||
      gravityUniverse.gravityObjectsChildren[gravityObject.parentObjectId] == [];
    parentChildren.push(gravityObject);
  }
}
