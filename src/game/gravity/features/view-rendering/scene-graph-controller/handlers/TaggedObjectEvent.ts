import { Object3D } from "three";

export interface TaggedObject {
  object: Object3D;
  tag: string;
  name: string;
}

export interface TaggedObjectEvent {
  objectList: TaggedObject[];
}
