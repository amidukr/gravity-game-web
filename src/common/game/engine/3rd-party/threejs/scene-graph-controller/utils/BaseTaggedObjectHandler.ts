import { Introspection } from "../../../../../../app/lookup/Introspection";
import { BaseApplicationComponent } from "../../../../../../app/utils/BaseApplicationComponent";
import { TaggedObjectEvent } from "../handlers/TaggedObjectEvent";
import { TaggedObjectOnCreate, TYPE_TaggedObjectOnCreate } from "../handlers/TaggedObjectOnCreate";
import { TaggedObjectOnUpdate, TYPE_TaggedObjectOnUpdate } from "../handlers/TaggedObjectOnUpdate";

export abstract class BaseTaggedObjectHandler extends BaseApplicationComponent implements TaggedObjectOnCreate, TaggedObjectOnUpdate {
  constructor() {
    super();

    Introspection.bindInterfaceName(this, TYPE_TaggedObjectOnCreate);
    Introspection.bindInterfaceName(this, TYPE_TaggedObjectOnUpdate);
  }

  abstract tagSelector(): string[];
  abstract onUpdate(event: TaggedObjectEvent): void;
  abstract onCreate(event: TaggedObjectEvent): void;
}
