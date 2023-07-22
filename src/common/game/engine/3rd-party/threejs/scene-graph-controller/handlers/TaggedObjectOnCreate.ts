import { typeIdentifier } from "../../../../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../../../package";
import { TaggedObjectEvent } from "./TaggedObjectEvent";

export const TYPE_TaggedObjectOnCreate = typeIdentifier<TaggedObjectOnCreate>("TaggedObjectOnCreate", PACKAGE_AmidGeFramework);

export interface TaggedObjectOnCreate {
  tagSelector(): string[];
  onCreate(event: TaggedObjectEvent): void;
}
