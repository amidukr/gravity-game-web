import { Introspection } from "../../../../../../app/lookup/Introspection";
import { BaseApplicationComponent } from "../../../../../../app/utils/BaseApplicationComponent";
import { GameSceneObjectTag, TaggedObject } from "../../../../features/rendering/GameSceneObjectMeta";
import { TaggedObjectEvent } from "../handlers/TaggedObjectEvent";
import { TaggedObjectOnCreate, TYPE_TaggedObjectOnCreate } from "../handlers/TaggedObjectOnCreate";

export abstract class BaseTaggedObjectOnCreateHandler<T> extends BaseApplicationComponent implements TaggedObjectOnCreate<T> {
  constructor() {
    super();

    Introspection.bindInterfaceName(this, TYPE_TaggedObjectOnCreate);
  }

  abstract tagSelector(): GameSceneObjectTag<T>[];
  abstract onCreateObject(object: TaggedObject<T>, event: TaggedObjectEvent<T>): void;

  onCreate(event: TaggedObjectEvent<T>): void {
    for (let i = 0; i < event.objectList.length; i++) {
      this.onCreateObject(event.objectList[i], event);
    }
  }
}
