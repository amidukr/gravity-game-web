import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../../common/app/utils/BaseApplicationComponent";
import { UssLocationTransformationHandler } from "../ext-api/UssLocationTransformationHandler";
import { UssLocation } from "../model/UssLocation";
import { UssPhysicalBody } from "../model/UssPhysicalBody";
import { UniverseSublocationService } from "../UniverseSublocationService";

export abstract class BaseUssLocationTransformationHandler extends BaseApplicationComponent implements UssLocationTransformationHandler {
  sublocationService!: UniverseSublocationService;

  autowire(application: ApplicationContainer): void {
    this.sublocationService = application.getComponent(UniverseSublocationService);

    this.sublocationTypes().forEach((x) => this.sublocationService.registerTransformationHandler(x, this));
  }

  abstract sublocationTypes(): string[];
  abstract locationAsIfrObject(location: UssLocation): UssPhysicalBody;

  transformToChildCoordinates(parentCoordinates: UssPhysicalBody, childLocation: UssLocation): UssPhysicalBody {
    const childIfrObject = this.locationAsIfrObject(childLocation);

    return {
      position: parentCoordinates.position.clone().sub(childIfrObject.position),
      velocity: parentCoordinates.velocity.clone().sub(childIfrObject.velocity),
    };
  }

  transformToParentCoordinates(childCoordinates: UssPhysicalBody, childLocation: UssLocation): UssPhysicalBody {
    const childIfrObject = this.locationAsIfrObject(childLocation);

    return {
      position: childCoordinates.position.clone().add(childIfrObject.position),
      velocity: childCoordinates.velocity.clone().add(childIfrObject.velocity),
    };
  }
}
