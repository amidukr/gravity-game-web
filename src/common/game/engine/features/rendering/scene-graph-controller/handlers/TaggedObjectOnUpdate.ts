import { typeIdentifier } from "../../../../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../../../package";
import { SceneObjectTag } from "../../SceneTaggingModel";
import { TaggedObjectEvent } from "./TaggedObjectEvent";

export const TYPE_TaggedObjectOnUpdate = typeIdentifier<TaggedObjectOnUpdate<any>>("TaggedObjectOnUpdate", PACKAGE_AmidGeFramework);

export interface TaggedObjectOnUpdate<T> {
  tagSelector(): SceneObjectTag<T>[];
  onUpdate(event: TaggedObjectEvent<T>): void;
}
