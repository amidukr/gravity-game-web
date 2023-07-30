import { SceneObjectTag, TaggedObject } from "../SceneTaggingModel";
import { TaggedObjectEvent } from "./TaggedObjectEvent";
import { TaggedObjectEventCallback, TaggedSceneEngine } from "./TaggedSceneEngine";

export type TaggedObjectEventEachCallback<T> = (object: TaggedObject<T>, event: TaggedObjectEvent<T>) => void;

function handleEvent<T>(e: TaggedObjectEvent<T>, handler: TaggedObjectEventEachCallback<T>) {
  const list = e.objectList;
  for (let i = 0; i < list.length; i++) {
    handler(list[i], e);
  }
}

export class SceneSubscribeContext {
  constructor(readonly taggedController: TaggedSceneEngine) {}

  registerOnDelete<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>): void {
    this.taggedController.registerOnDelete(tags, handler);
  }

  registerOnAdd<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>): void {
    this.taggedController.registerOnAdd(tags, handler);
  }

  registerOnUpdate<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>): void {
    this.taggedController.registerOnUpdate(tags, handler);
  }

  registerOnDeleteEach<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventEachCallback<T>): void {
    this.registerOnDelete(tags, (e) => handleEvent(e, handler));
  }

  registerOnAddEach<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventEachCallback<T>): void {
    this.registerOnAdd(tags, (e) => handleEvent(e, handler));
  }

  registerOnUpdateEach<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventEachCallback<T>): void {
    this.registerOnUpdate(tags, (e) => handleEvent(e, handler));
  }
}
