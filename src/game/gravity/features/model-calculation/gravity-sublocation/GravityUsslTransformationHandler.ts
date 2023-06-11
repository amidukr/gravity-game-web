import { Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseUssLocationTransformationHandler } from "../../commons/universe-sublocation/helpers/BaseUssLocationTransformationHandler";
import { UssLocation } from "../../commons/universe-sublocation/model/UssLocation";
import { UssPhysicalBody } from "../../commons/universe-sublocation/model/UssPhysicalBody";
import { GravityUniverseModel } from "../gravity-universe/model/GravityUniverseModel";

export const USSL_UNIVERSE = "Universe";
export const USSL_SPACE_GRAVITY_OBJECT = "SpaceGravityObject";

export interface GravityUssLocation extends UssLocation {
  type: typeof USSL_SPACE_GRAVITY_OBJECT;
  attributes: {
    gravityObjectName: string;
  };
}

export class GravityUsslTransformationHandler extends BaseUssLocationTransformationHandler {
  gravityUniverseModel!: GravityUniverseModel;

  override autowire(application: ApplicationContainer): void {
    this.gravityUniverseModel = application.getComponent(GravityUniverseModel);

    super.autowire(application);
  }

  override sublocationTypes(): string[] {
    return [USSL_UNIVERSE, USSL_SPACE_GRAVITY_OBJECT];
  }

  override locationAsIfrObject(location: UssLocation): UssPhysicalBody {
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
        velocity: gravityObject.currentVelocity.clone(),
      };
    } else {
      throw Error(`Unsupported type ${location.type}`);
    }
  }
}
