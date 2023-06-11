import { Vector3 } from "three";
import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../../common/app/utils/BaseApplicationComponent";
import { DebugInfoModel } from "../../../framework/debug/DebugInfoModel";
import { UssLocationContainerHandler, USS_OBJECT_PRESENCE_THRESHOLD } from "../ext-api/UssLocationContainerHandler";
import { UssLocation } from "../model/UssLocation";
import { UssPhysicalBody } from "../model/UssPhysicalBody";
import { UniverseSublocationService } from "../UniverseSublocationService";

export abstract class BaseUssLocationContainerHandler extends BaseApplicationComponent implements UssLocationContainerHandler {
  sublocationService!: UniverseSublocationService;
  debug!: DebugInfoModel;

  autowire(application: ApplicationContainer): void {
    this.sublocationService = application.getComponent(UniverseSublocationService);
    this.debug = application.getComponent(DebugInfoModel);

    this.sublocationTypes().forEach((x) => this.sublocationService.registerContainerHandler(x, this));
  }

  abstract listSubLocationObjects(location: UssLocation): UssLocation[] | null;
  abstract objectPreseneceFactor(location: UssLocation, position: Vector3): number;
  abstract sublocationTypes(): string[];

  findChildSublocation(location: UssLocation, position: Vector3): UssLocation | null {
    const childSubLocations = this.listSubLocationObjects(location);

    if (childSubLocations == null) {
      return null;
    }

    var bestSublocation: UssLocation | null = null;
    var bestPresenceFactor = 0;
    const UssPhysicalBody: UssPhysicalBody = { position: position, velocity: new Vector3() };
    for (var i = 0; i < childSubLocations.length; i++) {
      const childSubLocation = childSubLocations[i];
      const childCoordinates = this.sublocationService.transformToChildCoordinates(UssPhysicalBody, childSubLocation);
      const presenceFactor = this.objectPreseneceFactor(childSubLocation, childCoordinates.position);
      if (presenceFactor > bestPresenceFactor) {
        bestPresenceFactor = presenceFactor;
        bestSublocation = childSubLocation;
      }
    }

    this.debug.object.attributes["subLocation"] = `${bestSublocation?.attributes.gravityObjectName}: ${bestPresenceFactor}`;

    if (bestPresenceFactor > USS_OBJECT_PRESENCE_THRESHOLD) {
      return bestSublocation;
    } else {
      return null;
    }
  }
}
