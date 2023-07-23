import { TaggedObject } from "../../../../features/rendering/SceneTaggingModel";

export interface TaggedObjectEvent<T> {
  objectList: TaggedObject<T>[];
}
