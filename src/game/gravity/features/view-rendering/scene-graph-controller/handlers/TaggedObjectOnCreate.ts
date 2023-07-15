import { typeIdentifier } from "../../../../../../common/app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../../../common/package";
import { TaggedObjectEvent } from "./TaggedObjectEvent";

export const TYPE_TaggedObjectOnCreate = typeIdentifier<TaggedObjectOnCreate>("TaggedObjectOnCreate", PACKAGE_AmidGeFramework);

export interface TaggedObjectOnCreate {
  tagSelector(): string[];
  onCreate(event: TaggedObjectEvent): void;
}
