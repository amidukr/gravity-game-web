import { SceneTaggingModel, TaggedObject } from "../SceneTaggingModel";

export interface TaggedObjectEvent<T> {
  objectList: TaggedObject<T>[];
  sceneTagModel: SceneTaggingModel;
}
