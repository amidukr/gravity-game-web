import { Introspection } from "../../../../../../app/lookup/Introspection";
import { BaseApplicationComponent } from "../../../../../../app/utils/BaseApplicationComponent";
import { SceneObjectTag } from "../../../../features/rendering/SceneTaggingModel";
import { TaggedObjectEvent } from "../handlers/TaggedObjectEvent";
import { TaggedObjectOnCreate, TYPE_TaggedObjectOnCreate } from "../handlers/TaggedObjectOnCreate";
import { TaggedObjectOnUpdate, TYPE_TaggedObjectOnUpdate } from "../handlers/TaggedObjectOnUpdate";

export abstract class BaseTaggedObjectHandler<T> extends BaseApplicationComponent implements TaggedObjectOnCreate<T>, TaggedObjectOnUpdate<T> {
  constructor() {
    super();

    Introspection.bindInterfaceName(this, TYPE_TaggedObjectOnCreate);
    Introspection.bindInterfaceName(this, TYPE_TaggedObjectOnUpdate);
  }

  abstract tagSelector(): SceneObjectTag<T>[];
  abstract onUpdate(event: TaggedObjectEvent<T>): void;
  abstract onCreate(event: TaggedObjectEvent<T>): void;
}
