import { LifecycleStage } from "../../../../../app/utils/LifecycleStage";
import { SceneObjectTag, TaggedObject } from "../SceneTaggingModel";
import { TaggedObjectEvent } from "./TaggedObjectEvent";
import { TaggedObjectEventCallback, TaggedSceneEngine } from "./TaggedSceneEngine";

export type TaggedObjectEventEachCallback<T> = (object: TaggedObject<T>, event: TaggedObjectEvent<T>) => void;

export interface SceneSubscribeArguments {
  executionOrder: LifecycleStage;
}

export abstract class TaggedControllerExecutionOrder {
  static Delete = LifecycleStage.root();
  static Add = LifecycleStage.runAfter(this.Delete);
  static Update = LifecycleStage.runAfter(this.Add);
}

function handleEvent<T>(e: TaggedObjectEvent<T>, handler: TaggedObjectEventEachCallback<T>) {
  const list = e.objectList;
  for (let i = 0; i < list.length; i++) {
    handler(list[i], e);
  }
}

export class SceneSubscribeContext {
  constructor(readonly taggedController: TaggedSceneEngine) {}

  registerOnDelete<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>, args?: SceneSubscribeArguments): void {
    this.taggedController.registerOnDelete(tags, {
      executionOrder: (args?.executionOrder || TaggedControllerExecutionOrder.Delete).getOrderIndex(),
      callback: handler,
    });
  }

  registerOnAdd<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>, args?: SceneSubscribeArguments): void {
    this.taggedController.registerOnAdd(tags, {
      executionOrder: (args?.executionOrder || TaggedControllerExecutionOrder.Add).getOrderIndex(),
      callback: handler,
    });
  }

  registerOnUpdate<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>, args?: SceneSubscribeArguments): void {
    this.taggedController.registerOnUpdate(tags, {
      executionOrder: (args?.executionOrder || TaggedControllerExecutionOrder.Update).getOrderIndex(),
      callback: handler,
    });
  }

  registerOnDeleteEach<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventEachCallback<T>, args?: SceneSubscribeArguments): void {
    this.registerOnDelete(tags, (e) => handleEvent(e, handler), args);
  }

  registerOnAddEach<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventEachCallback<T>, args?: SceneSubscribeArguments): void {
    this.registerOnAdd(tags, (e) => handleEvent(e, handler), args);
  }

  registerOnUpdateEach<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventEachCallback<T>, args?: SceneSubscribeArguments): void {
    this.registerOnUpdate(tags, (e) => handleEvent(e, handler), args);
  }
}
