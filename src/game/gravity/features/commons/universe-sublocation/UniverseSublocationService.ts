import { Vector3 } from "three";
import { UssLocationContainerHandler, USS_OBJECT_PRESENCE_THRESHOLD } from "./ext-api/UssLocationContainerHandler";
import { UssLocationTransformationHandler } from "./ext-api/UssLocationTransformationHandler";
import { UssLocation } from "./model/UssLocation";
import { UssObject } from "./model/UssObject";
import { UssPhysicalBody } from "./model/UssPhysicalBody";

export class UniverseSublocationService {
  private containerHandlers: { [k: string]: UssLocationContainerHandler } = {};
  private transformationHandlers: { [k: string]: UssLocationTransformationHandler } = {};

  normalizeCoordinate(entity: UssObject): UssObject {
    var newLocation: UssLocation | null;
    var commonParentLocation: UssLocation | null;
    if (this.isInBoundOfLocation(entity)) {
      newLocation = this.findChildSublocation(entity.location, entity.position);
      commonParentLocation = entity.location;
    } else {
      newLocation = entity.location.parent;
      commonParentLocation = entity.location.parent;
    }

    if (newLocation != null && commonParentLocation != null) {
      return this.transformToLocationCoordinate(entity, newLocation, commonParentLocation);
    }

    return entity;
  }

  transformToLocationCoordinate(entity: UssObject, newLocation: UssLocation, commonParentLocation: UssLocation): UssObject {
    var resultObject: UssPhysicalBody = entity;
    var resultLocation: UssLocation | null = entity.location;

    while (resultLocation != commonParentLocation && resultLocation != null) {
      resultObject = this.transformToParentCoordinates(resultObject, resultLocation);
      resultLocation = resultLocation.parent;
    }

    const transformationLocationArray: UssLocation[] = [];
    var newLocationIterator: UssLocation | null = newLocation;
    while (newLocationIterator != commonParentLocation && newLocationIterator != null) {
      transformationLocationArray.push(newLocationIterator);
      newLocationIterator = newLocationIterator.parent;
    }
    if (newLocationIterator != null) {
      transformationLocationArray.push(newLocationIterator);
    }

    for (var i = transformationLocationArray.length - 1; i > 0; i--) {
      const childLocation = transformationLocationArray[i - 1];
      resultObject = this.transformToChildCoordinates(resultObject, childLocation);
    }

    return {
      location: newLocation,
      position: resultObject.position,
      velocity: resultObject.velocity,
    };
  }

  transformToChildCoordinates(parentCoordinates: UssPhysicalBody, childLocation: UssLocation): UssPhysicalBody {
    return this.getTransformationHandler(childLocation).transformToChildCoordinates(parentCoordinates, childLocation);
  }

  transformToParentCoordinates(childCoordinates: UssPhysicalBody, childLocation: UssLocation): UssPhysicalBody {
    return this.getTransformationHandler(childLocation).transformToParentCoordinates(childCoordinates, childLocation);
  }

  findChildSublocation(location: UssLocation, position: Vector3): UssLocation | null {
    const handler = this.getContainerHandler(location);
    return handler.findChildSublocation(location, position);
  }

  isInBoundOfLocation(entity: UssObject): Boolean {
    const handler = this.getContainerHandler(entity.location);
    return handler.objectPreseneceFactor(entity.location, entity.position) >= USS_OBJECT_PRESENCE_THRESHOLD;
  }

  calculatePresenceFactor(UssObject: UssObject): any {
    const location = UssObject.location;
    const position = UssObject.position;
    return this.getContainerHandler(location).objectPreseneceFactor(location, position);
  }

  getContainerHandler(location: UssLocation): UssLocationContainerHandler {
    return this.containerHandlers[location.type];
  }

  registerContainerHandler(locationType: string, handler: UssLocationContainerHandler) {
    this.containerHandlers[locationType] = handler;
  }

  getTransformationHandler(location: UssLocation): UssLocationTransformationHandler {
    return this.transformationHandlers[location.type];
  }

  registerTransformationHandler(locationType: string, handler: UssLocationTransformationHandler) {
    this.transformationHandlers[locationType] = handler;
  }
}
