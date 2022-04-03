import { Vector3 } from "three";
import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../../common/app/utils/BaseApplicationComponent";
import { GravityObject, GravityUniverseModel, GRAVITY_OBJECT_UNIVERSE } from "../model/GravityUniverseModel";

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

      orbitAngularVelocity: 0.0,
      orbitRotationAxis: new Vector3(0, 1, 0),
      lastCalculatedTimeMilliseconds: 0,
      currentPosition: object.initialPosition.clone(),
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

    const G = 1.0e15;

    const radius = child.initialPosition.length();

    let orbitRotationAxis: Vector3;
    let orbitAngularVelocity: number;

    if (radius >= 0) {
      orbitRotationAxis = new Vector3(child.initialPosition.y, 0, child.initialPosition.x).cross(child.initialPosition);
      orbitAngularVelocity = Math.sqrt(G * parentObject.mass) / Math.pow(radius, 1.5);
    } else {
      orbitRotationAxis = new Vector3(0, 1, 0);
      orbitAngularVelocity = 0;
    }

    this.gravityUniverseModel.addGravityObject({
      objectId: child.objectId,
      objectType: child.objectType,
      parentObjectId: parentObject.objectId,

      mass: child.mass,

      initialPosition: child.initialPosition.clone(),
      orbitRotationAxis: orbitRotationAxis.normalize(),
      orbitAngularVelocity: orbitAngularVelocity,

      lastCalculatedTimeMilliseconds: 0,
      currentPosition: child.initialPosition.clone(),
    });
  }
}
