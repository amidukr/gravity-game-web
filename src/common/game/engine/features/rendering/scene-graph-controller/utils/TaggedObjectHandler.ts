import { Introspection } from "../../../../../../app/lookup/Introspection";
import { typeIdentifier } from "../../../../../../app/lookup/TypeIdentifier";
import { BaseApplicationComponent } from "../../../../../../app/utils/BaseApplicationComponent";
import { LifecycleStage } from "../../../../../../app/utils/LifecycleStage";
import { PACKAGE_AmidGeFramework } from "../../../../../../package";
import { GameLoader, TYPE_GameStarter } from "../../../../core/GameLoader";
import { GameLoaderExecutionOrder } from "../../../../framework/GameLoaderTypes";
import { SceneObjectTag } from "../../SceneTaggingModel";
import { TaggedObjectEvent } from "../handlers/TaggedObjectEvent";
import { SceneTaggedController, TaggedObjectEventCallback } from "../SceneTaggedController";

export type TaggedObjectEventEachCallback<T> = (object: T, event: TaggedObjectEvent<T>) => void;
export const TYPE_TaggedObjectHandler = typeIdentifier<TaggedObjectHandler>("TaggedObjectHandler", PACKAGE_AmidGeFramework);

function handleEvent<T>(e: TaggedObjectEvent<T>, handler: TaggedObjectEventEachCallback<T>) {
  const list = e.objectList;
  for (let i = 0; i < list.length; i++) {
    handler(list[i].object, e);
  }
}

export class SubscribeContext {
  constructor(readonly taggedController: SceneTaggedController) {}

  registerOnCreate<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>): void {
    this.taggedController.registerOnCreate(tags, handler);
  }

  registerOnUpdate<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>): void {
    this.taggedController.registerOnUpdate(tags, handler);
  }

  registerOnCreateEach<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventEachCallback<T>): void {
    this.registerOnCreate(tags, (e) => handleEvent(e, handler));
  }

  registerOnUpdateEach<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventEachCallback<T>): void {
    this.registerOnUpdate(tags, (e) => handleEvent(e, handler));
  }
}

export abstract class TaggedObjectHandler extends BaseApplicationComponent implements GameLoader {
  constructor() {
    super();
    Introspection.bindInterfaceName(this, TYPE_TaggedObjectHandler);
    Introspection.bindInterfaceName(this, TYPE_GameStarter);
  }

  executionOrder(): LifecycleStage {
    return GameLoaderExecutionOrder.TagHandlersStarter;
  }

  startNewGame(): void | Promise<void> {}

  onNewController(controller: SceneTaggedController) {
    this.subscribe(new SubscribeContext(controller));
  }

  abstract subscribe(ctx: SubscribeContext): void;
}
