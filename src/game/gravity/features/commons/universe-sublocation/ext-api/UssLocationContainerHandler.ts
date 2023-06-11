import { Vector3 } from "three";
import { UssLocation } from "../model/UssLocation";

export const USS_OBJECT_PRESENCE_THRESHOLD = 0.2;

export interface UssLocationContainerHandler {
  findChildSublocation(location: UssLocation, position: Vector3): UssLocation | null;
  objectPreseneceFactor(location: UssLocation, position: Vector3): number;
}
