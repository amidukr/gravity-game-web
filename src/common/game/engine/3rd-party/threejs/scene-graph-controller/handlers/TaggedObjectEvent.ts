import { TaggedObject } from "../../../../features/rendering/GameSceneObjectMeta";

export interface TaggedObjectEvent<T> {
  objectList: TaggedObject<T>[];
}
