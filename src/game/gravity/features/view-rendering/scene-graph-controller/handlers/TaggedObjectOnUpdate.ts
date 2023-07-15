import { typeIdentifier } from "../../../../../../common/app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../../../common/package";
import { TaggedObjectEvent } from "./TaggedObjectEvent";

export const TYPE_TaggedObjectOnUpdate = typeIdentifier<TaggedObjectOnUpdate>("TaggedObjectOnUpdate", PACKAGE_AmidGeFramework);

export interface TaggedObjectOnUpdate {
  tagSelector(): string[];
  onUpdate(event: TaggedObjectEvent): void;
}
