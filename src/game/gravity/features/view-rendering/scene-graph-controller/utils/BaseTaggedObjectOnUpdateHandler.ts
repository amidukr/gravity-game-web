import { Introspection } from "../../../../../../common/app/lookup/Introspection";
import { BaseApplicationComponent } from "../../../../../../common/app/utils/BaseApplicationComponent";
import { TaggedObject, TaggedObjectEvent } from "../handlers/TaggedObjectEvent";
import { TaggedObjectOnUpdate, TYPE_TaggedObjectOnUpdate } from "../handlers/TaggedObjectOnUpdate";

export abstract class BaseTaggedObjectOnUpdateHandler extends BaseApplicationComponent implements TaggedObjectOnUpdate {
  constructor() {
    super();

    Introspection.bindInterfaceName(this, TYPE_TaggedObjectOnUpdate);
  }

  abstract tagSelector(): string[];
  abstract onUpdateObject(object: TaggedObject, event: TaggedObjectEvent): void;

  onUpdate(event: TaggedObjectEvent): void {
    for (let i = 0; i < event.objectList.length; i++) {
      this.onUpdateObject(event.objectList[i], event);
    }
  }
}
