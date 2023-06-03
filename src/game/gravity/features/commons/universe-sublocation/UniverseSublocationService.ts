import { Vector3 } from "three";
import { UssLocationHandler, USS_OBJECT_PRESENCE_THRESHOLD } from "./ext-api/UssLocationHandler";
import { UssObject } from "./model/UssObject";
import { UssPhysicalBody } from "./model/UssPhysicalBody";
import { UssLocation } from "./model/UssLocation";

export class UniverseSublocationService {
  private handlers: { [k: string]: UssLocationHandler } = {};

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

  transformToChildCoordinates(object: UssPhysicalBody, childLocation: UssLocation): UssPhysicalBody {
    const handler = this.getLocationHandler(childLocation);
    const locationIfr = handler.locationAsIfrObject(childLocation);

    return {
      position: object.position.clone().sub(locationIfr.position),
      velocity: object.velocity.clone().sub(locationIfr.velocity),
    };
  }

  transformToParentCoordinates(object: UssPhysicalBody, childLocation: UssLocation): UssPhysicalBody {
    const handler = this.getLocationHandler(childLocation);
    const locationIfr = handler.locationAsIfrObject(childLocation);

    return {
      position: object.position.clone().add(locationIfr.position),
      velocity: object.velocity.clone().add(locationIfr.velocity),
    };
  }

  findChildSublocation(location: UssLocation, position: Vector3): UssLocation | null {
    const handler = this.getLocationHandler(location);
    return handler.findChildSublocation(location, position);
  }

  isInBoundOfLocation(entity: UssObject): Boolean {
    const handler = this.getLocationHandler(entity.location);
    return handler.objectPreseneceFactor(entity.location, entity.position) >= USS_OBJECT_PRESENCE_THRESHOLD;
  }

  calculatePresenceFactor(UssObject: UssObject): any {
    const location = UssObject.location
    const position = UssObject.position
    return this.getLocationHandler(location).objectPreseneceFactor(location, position) 
  }

  getLocationHandler(location: UssLocation): UssLocationHandler {
    return this.handlers[location.type];
  }

  registerLocationHandler(locationType: string, handler: UssLocationHandler) {
    this.handlers[locationType] = handler;
  }

}
