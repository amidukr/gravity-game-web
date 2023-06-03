import { UssPhysicalBody } from "./UssPhysicalBody";
import { UssLocation } from "./UssLocation";

export interface UssObject extends UssPhysicalBody {
  location: UssLocation;
}
