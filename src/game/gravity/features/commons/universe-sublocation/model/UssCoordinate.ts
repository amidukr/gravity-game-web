import { UssIfrObject } from "./UssIfrObject";
import { UssLocation } from "./UssLocation";

export interface UssCoordinate extends UssIfrObject {
  location: UssLocation;
}
