import { typeIdentifier } from "../../../../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../../../package";
import { GameSceneObjectTag } from "../../../../features/rendering/GameSceneObjectMeta";
import { TaggedObjectEvent } from "./TaggedObjectEvent";

export const TYPE_TaggedObjectOnUpdate = typeIdentifier<TaggedObjectOnUpdate<any>>("TaggedObjectOnUpdate", PACKAGE_AmidGeFramework);

export interface TaggedObjectOnUpdate<T> {
  tagSelector(): GameSceneObjectTag<T>[];
  onUpdate(event: TaggedObjectEvent<T>): void;
}
