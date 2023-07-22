import { typeIdentifier } from "../../../../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../../../package";
import { TaggedObjectEvent } from "./TaggedObjectEvent";

export const TYPE_TaggedObjectOnUpdate = typeIdentifier<TaggedObjectOnUpdate>("TaggedObjectOnUpdate", PACKAGE_AmidGeFramework);

export interface TaggedObjectOnUpdate {
  tagSelector(): string[];
  onUpdate(event: TaggedObjectEvent): void;
}
