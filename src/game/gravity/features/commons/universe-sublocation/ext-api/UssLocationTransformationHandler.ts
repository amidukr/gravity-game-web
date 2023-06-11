import { UssLocation } from "../model/UssLocation";
import { UssPhysicalBody } from "../model/UssPhysicalBody";

export interface UssLocationTransformationHandler {
  transformToChildCoordinates(parentCoordinates: UssPhysicalBody, childLocation: UssLocation): UssPhysicalBody;
  transformToParentCoordinates(childCoordinates: UssPhysicalBody, childLocation: UssLocation): UssPhysicalBody;
}
