import { Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { USS_OBJECT_PRESENCE_THRESHOLD } from "../../commons/universe-sublocation/ext-api/UssLocationContainerHandler";
import { BaseUssLocationContainerHandler } from "../../commons/universe-sublocation/helpers/BaseUssLocationContainerHandler";
import { UssLocation } from "../../commons/universe-sublocation/model/UssLocation";
import { GravityObject, GravityUniverseModel, GRAVITY_OBJECT_UNIVERSE } from "../gravity-universe/model/GravityUniverseModel";
import { GRAVITY_CONSTANT } from "../gravity-universe/service/GravityUniverseService";

export const USSL_UNIVERSE = "Universe";
export const USSL_SPACE_GRAVITY_OBJECT = "SpaceGravityObject";

export interface GravityUssLocation extends UssLocation {
  type: typeof USSL_SPACE_GRAVITY_OBJECT;
  attributes: {
    gravityObjectName: string;
  };
}

export class GravityUsslContainerHandler extends BaseUssLocationContainerHandler {
  gravityUniverseModel!: GravityUniverseModel;

  override autowire(application: ApplicationContainer): void {
    this.gravityUniverseModel = application.getComponent(GravityUniverseModel);

    super.autowire(application);
  }

  override sublocationTypes(): string[] {
    return [USSL_UNIVERSE, USSL_SPACE_GRAVITY_OBJECT];
  }

  override listSubLocationObjects(location: UssLocation): UssLocation[] | null {
    var objects: GravityObject[] | null = null;
    if (location.type == USSL_UNIVERSE) {
      objects = this.gravityUniverseModel.getGravityChildren(GRAVITY_OBJECT_UNIVERSE);
    } else if (location.type == USSL_SPACE_GRAVITY_OBJECT) {
      const gul = location as GravityUssLocation;
      objects = this.gravityUniverseModel.getGravityChildren(gul.attributes.gravityObjectName);
    }

    return objects?.map((o) => this.gravityObjectToSublocation(location, o)) || null;
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

  override objectPreseneceFactor(location: UssLocation, position: Vector3): number {
    if (location.type == USSL_UNIVERSE) {
      return USS_OBJECT_PRESENCE_THRESHOLD;
    } else if (location.type == USSL_SPACE_GRAVITY_OBJECT) {
      const gul = location as GravityUssLocation;
      const gravityObject = this.gravityUniverseModel.getGravityObject(gul.attributes.gravityObjectName);
      const l = position.length();
      return (GRAVITY_CONSTANT * gravityObject.mass) / (l * l) / 400;
    } else {
      throw Error("Unsuported operation");
    }
  }
}
