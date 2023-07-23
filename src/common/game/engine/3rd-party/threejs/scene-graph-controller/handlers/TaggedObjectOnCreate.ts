import { typeIdentifier } from "../../../../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../../../package";
import { GameSceneObjectTag } from "../../../../features/rendering/GameSceneObjectMeta";
import { TaggedObjectEvent } from "./TaggedObjectEvent";

export const TYPE_TaggedObjectOnCreate = typeIdentifier<TaggedObjectOnCreate<any>>("TaggedObjectOnCreate", PACKAGE_AmidGeFramework);

export interface TaggedObjectOnCreate<T> {
  tagSelector(): GameSceneObjectTag<T>[];
  onCreate(event: TaggedObjectEvent<T>): void;
}
