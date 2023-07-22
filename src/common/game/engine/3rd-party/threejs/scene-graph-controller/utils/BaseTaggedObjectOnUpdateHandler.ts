import { Introspection } from "../../../../../../app/lookup/Introspection";
import { BaseApplicationComponent } from "../../../../../../app/utils/BaseApplicationComponent";
import { TaggedObject } from "../../ThreeJsSceneTagIndex";
import { TaggedObjectEvent } from "../handlers/TaggedObjectEvent";
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
