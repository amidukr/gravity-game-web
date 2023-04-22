import { Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../common/app/utils/BaseApplicationComponent";
import { UssLocationHandler, USS_OBJECT_PRESENCE_THRESHOLD } from "../../commons/universe-sublocation/ext-api/UssLocationHandler";
import { UssIfrObject } from "../../commons/universe-sublocation/model/UssIfrObject";
import { UssLocation } from "../../commons/universe-sublocation/model/UssLocation";
import { UniverseSublocationService } from "../../commons/universe-sublocation/UniverseSublocationService";
import { GravityObject, GravityUniverseModel, GRAVITY_OBJECT_UNIVERSE } from "../gravity-universe/model/GravityUniverseModel";

export const USSL_UNIVERSE = "Universe";
export const USSL_SPACE_GRAVITY_OBJECT = "SpaceGravityObject";

export interface GravityUssLocation extends UssLocation {
  type: typeof USSL_SPACE_GRAVITY_OBJECT;
  attributes: {
    gravityObjectName: string;
  };
}

export class GravityUsslh extends BaseApplicationComponent implements UssLocationHandler {
  gravityUniverseModel!: GravityUniverseModel;
  sublocationService!: UniverseSublocationService;

  autowire?(application: ApplicationContainer): void {
    this.gravityUniverseModel = application.getComponent(GravityUniverseModel);
    this.sublocationService = application.getComponent(UniverseSublocationService);

    this.sublocationService.registerLocationHandler(USSL_UNIVERSE, this);
    this.sublocationService.registerLocationHandler(USSL_SPACE_GRAVITY_OBJECT, this);
  }

  findChildSublocation(location: UssLocation, position: Vector3): UssLocation | null {
    var objects: GravityObject[];
    if (location.type == USSL_UNIVERSE) {
      objects = this.gravityUniverseModel.getGravityChildren(GRAVITY_OBJECT_UNIVERSE);
    } else if (location.type == USSL_SPACE_GRAVITY_OBJECT) {
      const gul = location as GravityUssLocation;
      objects = this.gravityUniverseModel.getGravityChildren(gul.attributes.gravityObjectName);
    } else {
      return null;
    }

    var bestSublocation: UssLocation | null = null;
    var bestPresenceFactor = 0;
    const ussIfrObject: UssIfrObject = { position: position, velocity: new Vector3() };
    for (var i = 0; i < objects.length; i++) {
      const childSublocation = this.gravityObjectToSublocation(location, objects[i]);
      const childCoordinates = this.sublocationService.transformToChildCoordinates(ussIfrObject, childSublocation);
      const presenceFactor = this.objectPreseneceFactor(location, childCoordinates.position);
      if (presenceFactor > bestPresenceFactor) {
        bestPresenceFactor = presenceFactor;
        bestSublocation = childSublocation;
      }
    }

    return bestSublocation;
  }
  gravityObjectToSublocation(parentLocation: UssLocation, object: GravityObject): GravityUssLocation {
    return {
      type: USSL_SPACE_GRAVITY_OBJECT,
      parent: parentLocation,
      attributes: {
        gravityObjectName: object.objectId,
      },
    };
  }

  locationAsIfrObject(location: UssLocation): UssIfrObject {
    if (location.type == USSL_UNIVERSE) {
      return {
        position: new Vector3(),
        velocity: new Vector3(),
      };
    } else if (location.type == USSL_SPACE_GRAVITY_OBJECT) {
      const gul = location as GravityUssLocation;
      const gravityObject = this.gravityUniverseModel.getGravityObject(gul.attributes.gravityObjectName);

      return {
        position: gravityObject.currentPosition,
        velocity: new Vector3(),
      };
    } else {
      throw Error(`Unsupported type ${location.type}`);
    }
  }

  objectPreseneceFactor(location: UssLocation, position: Vector3): number {
    if (location.type == USSL_UNIVERSE) {
      return USS_OBJECT_PRESENCE_THRESHOLD;
    } else if (location.type == USSL_SPACE_GRAVITY_OBJECT) {
      const gul = location as GravityUssLocation;
      const gravityObject = this.gravityUniverseModel.getGravityObject(gul.attributes.gravityObjectName);
      const l = position.length();
      return gravityObject.mass / (l * l);
    } else {
      throw Error("Unsuported operation");
    }
  }
}
