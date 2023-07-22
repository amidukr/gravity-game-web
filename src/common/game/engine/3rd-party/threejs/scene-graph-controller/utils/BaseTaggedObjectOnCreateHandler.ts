import { Introspection } from "../../../../../../app/lookup/Introspection";
import { BaseApplicationComponent } from "../../../../../../app/utils/BaseApplicationComponent";
import { TaggedObject } from "../../ThreeJsSceneTagIndex";
import { TaggedObjectEvent } from "../handlers/TaggedObjectEvent";
import { TaggedObjectOnCreate, TYPE_TaggedObjectOnCreate } from "../handlers/TaggedObjectOnCreate";

export abstract class BaseTaggedObjectOnCreateHandler extends BaseApplicationComponent implements TaggedObjectOnCreate {
  constructor() {
    super();

    Introspection.bindInterfaceName(this, TYPE_TaggedObjectOnCreate);
  }

  abstract tagSelector(): string[];
  abstract onCreateObject(object: TaggedObject, event: TaggedObjectEvent): void;

  onCreate(event: TaggedObjectEvent): void {
    for (let i = 0; i < event.objectList.length; i++) {
      this.onCreateObject(event.objectList[i], event);
    }
  }
}
