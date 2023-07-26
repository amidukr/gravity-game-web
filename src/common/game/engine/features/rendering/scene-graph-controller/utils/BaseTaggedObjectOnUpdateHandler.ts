import { Introspection } from "../../../../../../app/lookup/Introspection";
import { BaseApplicationComponent } from "../../../../../../app/utils/BaseApplicationComponent";
import { SceneObjectTag, TaggedObject } from "../../SceneTaggingModel";
import { TaggedObjectEvent } from "../handlers/TaggedObjectEvent";
import { TaggedObjectOnUpdate, TYPE_TaggedObjectOnUpdate } from "../handlers/TaggedObjectOnUpdate";

export abstract class BaseTaggedObjectOnUpdateHandler<T> extends BaseApplicationComponent implements TaggedObjectOnUpdate<T> {
  constructor() {
    super();

    Introspection.bindInterfaceName(this, TYPE_TaggedObjectOnUpdate);
  }

  abstract tagSelector(): SceneObjectTag<T>[];
  abstract onUpdateObject(object: TaggedObject<T>, event: TaggedObjectEvent<T>): void;

  onUpdate(event: TaggedObjectEvent<T>): void {
    for (let i = 0; i < event.objectList.length; i++) {
      this.onUpdateObject(event.objectList[i], event);
    }
  }
}
