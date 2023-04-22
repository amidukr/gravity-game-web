import { Vector3 } from "three";
import { UssLocationHandler, USS_OBJECT_PRESENCE_THRESHOLD } from "./ext-api/UssLocationHandler";
import { USSEntity } from "./model/UssEntity";
import { UssIfrObject } from "./model/UssIfrObject";
import { UssLocation } from "./model/UssLocation";

export class UniverseSublocationService {
  private handlers: { [k: string]: UssLocationHandler } = {};

  normalizeCoordinate(entity: USSEntity): USSEntity {
    var newLocation: UssLocation | null;
    var commonParentLocation: UssLocation | null;
    if (this.isInBoundOfLocation(entity)) {
      newLocation = this.findChildSublocation(entity.location, entity.object.position);
      commonParentLocation = entity.location;
    } else {
      newLocation = entity.location.parent;
      commonParentLocation = entity.location.parent;
    }

    if (newLocation != null) {
      return this.transformToLocationCoordinate(entity, newLocation, commonParentLocation);
    }

    return entity;
  }

  transformToLocationCoordinate(entity: USSEntity, newLocation: UssLocation, commonParentLocation: UssLocation): USSEntity {
    var resultObject = entity.object;
    var resultLocation = entity.location;

    while (newLocation != commonParentLocation) {
      resultObject = this.transformToParentCoordinates(resultObject, resultLocation);
      resultLocation = resultLocation.parent;
    }

    const transformationLocationArray: UssLocation[] = [];
    var newLocationIterator = newLocation;
    while (newLocationIterator != commonParentLocation) {
      transformationLocationArray.push(resultLocation);
      newLocationIterator = newLocationIterator.parent;
    }
    transformationLocationArray.push(newLocationIterator);

    for (var i = transformationLocationArray.length - 1; i > 0; i--) {
      const childLocation = transformationLocationArray[i - 1];
      resultObject = this.transformToChildCoordinates(resultObject, childLocation);
    }

    return {
      location: newLocation,
      object: resultObject,
    };
  }

  transformToChildCoordinates(object: UssIfrObject, childLocation: UssLocation): UssIfrObject {
    const handler = this.getLocationHandler(childLocation);
    const locationIfr = handler.locationAsIfrObject(childLocation);

    return {
      position: object.position.clone().sub(locationIfr.position),
      velocity: object.velocity.clone().sub(locationIfr.velocity),
    };
  }

  transformToParentCoordinates(object: UssIfrObject, childLocation: UssLocation): UssIfrObject {
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

  isInBoundOfLocation(entity: USSEntity): Boolean {
    const handler = this.getLocationHandler(entity.location);
    return handler.objectPreseneceFactor(entity.location, entity.object.position) >= USS_OBJECT_PRESENCE_THRESHOLD;
  }

  getLocationHandler(location: UssLocation): UssLocationHandler {
    return this.handlers[location.type];
  }

  registerLocationHandler(locationType: string, handler: UssLocationHandler) {
    this.handlers[locationType] = handler;
  }
}
