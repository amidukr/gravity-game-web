import { UssLocation } from "./UssLocation";
import { UssPhysicalBody } from "./UssPhysicalBody";

export interface UssObject extends UssPhysicalBody {
  location: UssLocation;
}
