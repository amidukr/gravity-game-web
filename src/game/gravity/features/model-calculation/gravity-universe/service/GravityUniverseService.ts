import { Vector3 } from "three";
import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../../common/app/utils/BaseApplicationComponent";
import { GravityObject, GravityUniverseModel, GRAVITY_OBJECT_UNIVERSE } from "../model/GravityUniverseModel";
import { calculateGravityObjectVelocity } from "../utils/GravityUniverseUtils";

export const GRAVITY_CONSTANT = 1.0e15;

export class GravityUniverseService extends BaseApplicationComponent {
  gravityUniverseModel!: GravityUniverseModel;

  autowire(application: ApplicationContainer) {
    this.gravityUniverseModel = application.getComponent(GravityUniverseModel);
  }

  recalculateUniverse(): GravityObject[] {
    return Object.values(this.gravityUniverseModel.object.gravityObjectsByName);
  }

  addFixedGravityObject(object: {
    objectId: string;
    objectType: string;

    mass: number;

    initialPosition: Vector3;
  }) {
    this.gravityUniverseModel.addGravityObject({
      objectId: object.objectId,
      objectType: object.objectType,
      parentObjectId: GRAVITY_OBJECT_UNIVERSE,

      mass: object.mass,

      initialPosition: object.initialPosition.clone(),

      currentOrbitalRotateAngle: 0.0,
      orbitAngularVelocity: 0.0,
      orbitRotationAxis: new Vector3(0, 1, 0),
      orbitRadius: 0,
      lastCalculatedTimeMilliseconds: 0,
      currentPosition: object.initialPosition.clone(),
      currentVelocity: new Vector3(),
    });
  }

  addBoundGravityObject(
    parentId: string,
    child: {
      objectId: string;
      objectType: string;

      mass: number;

      initialPosition: Vector3;
    }
  ) {
    const parentObject = this.gravityUniverseModel.getGravityObject(parentId);

    const orbitRadius = child.initialPosition.length();

    let orbitRotationAxis: Vector3;
    let orbitAngularVelocity: number;

    if (orbitRadius >= 0) {
      orbitRotationAxis = new Vector3(child.initialPosition.y, 0, child.initialPosition.x).cross(child.initialPosition);
      orbitAngularVelocity = Math.sqrt(GRAVITY_CONSTANT * parentObject.mass) / Math.pow(orbitRadius, 1.5);
    } else {
      orbitRotationAxis = new Vector3(0, 1, 0);
      orbitAngularVelocity = 0;
    }

    orbitRotationAxis.normalize()

    const currentVelocity = calculateGravityObjectVelocity(
      {
        currentPosition: child.initialPosition,
        orbitRotationAxis: orbitRotationAxis,
        orbitAngularVelocity: orbitAngularVelocity,
        orbitRadius: orbitRadius,
      }
    )

    this.gravityUniverseModel.addGravityObject({
      objectId: child.objectId,
      objectType: child.objectType,
      parentObjectId: parentObject.objectId,

      mass: child.mass,

      initialPosition: child.initialPosition.clone(),
      currentOrbitalRotateAngle: 0.0,
      orbitRotationAxis: orbitRotationAxis,
      orbitAngularVelocity: orbitAngularVelocity,
      orbitRadius: orbitRadius,

      lastCalculatedTimeMilliseconds: 0,
      currentPosition: child.initialPosition.clone(),
      currentVelocity: currentVelocity,
    });
  }
}
