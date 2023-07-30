import { Object3D } from "three";
import { ApplicationContainer } from "../../../../../app/ApplicationContainer";
import { typeIdentifier } from "../../../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../../package";
import { addToObjectLst } from "../../../../../utils/CollectionUtils";
import { BaseGameSceneIndexerLoader } from "../../../framework/GameLoaderTypes";
import { SceneObjectTag, SceneTaggingModel, TaggedObject, TYPE_GameSceneTaggingModel } from "../SceneTaggingModel";
import { TaggedObjectEvent } from "./TaggedObjectEvent";

export const TYPE_TaggedEngineEventsListener = typeIdentifier<TaggedEngineEventsListener>("TaggedEngineEventsListener", PACKAGE_AmidGeFramework);

export interface TaggedEngineEventsListener {
  onNewEngine(engine: TaggedSceneEngine): void;
}

const emptySet = new Set();

export interface RednererArguments {
  scene: Object3D;
}

export type TaggedObjectEventCallback<T> = (event: TaggedObjectEvent<T>) => void;

export interface TaggedObjectEventHandlerArgument<T> {
  executionOrder: number;
  callback: TaggedObjectEventCallback<T>;
}

type CallQueue = {
  executionOrder: number;
  callback: () => void;
}[];

interface TagCache {
  [tag: string]: {
    tag: SceneObjectTag<any>;
    taggedObjects: TaggedObject<any>[];
    objects: Set<any>;
  };
}

export class TaggedSceneEngine extends BaseGameSceneIndexerLoader {
  private previousRun!: TagCache;

  taggingModel!: SceneTaggingModel;

  private onTagDeleteListenerByTag: { [tag: string]: TaggedObjectEventHandlerArgument<any>[] } = {};
  private onTagAddListenerByTag: { [tag: string]: TaggedObjectEventHandlerArgument<any>[] } = {};
  private onTagUpdateListenersByTag: { [tag: string]: TaggedObjectEventHandlerArgument<any>[] } = {};

  private tagCacheFilter: Set<string> = new Set<string>();

  autowire(container: ApplicationContainer) {
    this.taggingModel = container.getComponent(TYPE_GameSceneTaggingModel);

    container.getComponentList(TYPE_TaggedEngineEventsListener).forEach((x) => {
      x.onNewEngine(this);
    });

    const tagList: string[] = [];

    tagList.push(...Object.keys(this.onTagDeleteListenerByTag));
    tagList.push(...Object.keys(this.onTagAddListenerByTag));
    tagList.push(...Object.keys(this.onTagUpdateListenersByTag));

    this.tagCacheFilter = new Set(tagList);
  }

  override startNewGame(): void {
    this.previousRun = {};
  }

  registerOnDelete<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventHandlerArgument<T>): void {
    tags.forEach((x) => addToObjectLst(this.onTagDeleteListenerByTag, x.name, handler));
  }

  registerOnAdd<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventHandlerArgument<T>): void {
    tags.forEach((x) => addToObjectLst(this.onTagAddListenerByTag, x.name, handler));
  }

  registerOnUpdate<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventHandlerArgument<T>): void {
    tags.forEach((x) => addToObjectLst(this.onTagUpdateListenersByTag, x.name, handler));
  }

  preRender() {
    const taggedCache = this.buildTagCache();
    const callQueue: CallQueue = [];

    this.handlerOnTagDelete(callQueue, taggedCache);
    this.handleOnTagAdd(callQueue, taggedCache);
    this.handleOnTagUpdate(callQueue, taggedCache);

    callQueue.sort((a, b) => a.executionOrder - b.executionOrder).forEach((x) => x.callback());

    this.previousRun = this.buildTagCache();
  }

  private buildTagCache(): TagCache {
    const tagCache: TagCache = {};

    this.taggingModel.getTags().forEach((tag) => {
      const tagName = tag.name;

      if (!this.tagCacheFilter.has(tagName)) return;

      const taggedObjects = this.taggingModel.getObjectsByTag(tag);

      tagCache[tagName] = {
        tag: tag,
        taggedObjects: taggedObjects,
        objects: new Set(taggedObjects.map((x) => x.object)),
      };
    });

    return tagCache;
  }

  private handlerOnTagDelete(callQueue: CallQueue, tagCache: TagCache) {
    const emptySet = new Set();

    for (let tagName in this.previousRun) {
      const listeners = this.onTagDeleteListenerByTag[tagName];
      if (!listeners || listeners.length == 0) continue;

      const newObjectsList = tagCache[tagName].objects || emptySet;
      const deletedObjects = this.previousRun[tagName].taggedObjects.filter((x) => !newObjectsList.has(x.object));

      if (deletedObjects.length > 0) {
        const event: TaggedObjectEvent<any> = {
          objectList: deletedObjects,
          sceneTagModel: this.taggingModel,
        };

        callQueue.push(
          ...listeners.map((l) => ({
            executionOrder: l.executionOrder,
            callback: () => l.callback(event),
          }))
        );
      }
    }
  }

  private handleOnTagAdd(callQueue: CallQueue, tagCache: TagCache) {
    for (let tagName in tagCache) {
      const listeners = this.onTagAddListenerByTag[tagName];
      if (!listeners || listeners.length == 0) continue;

      const previousObjects = this.previousRun[tagName]?.objects || emptySet;
      const addObjectList = tagCache[tagName].taggedObjects.filter((x) => !previousObjects.has(x.object));

      if (addObjectList.length > 0) {
        const event: TaggedObjectEvent<any> = {
          objectList: addObjectList,
          sceneTagModel: this.taggingModel,
        };

        callQueue.push(
          ...listeners.map((l) => ({
            executionOrder: l.executionOrder,
            callback: () => l.callback(event),
          }))
        );
      }
    }
  }

  private handleOnTagUpdate(callQueue: CallQueue, tagCache: TagCache) {
    for (let tagName in tagCache) {
      const listeners = this.onTagUpdateListenersByTag[tagName];
      if (!listeners || listeners.length == 0) continue;

      const event: TaggedObjectEvent<any> = {
        objectList: tagCache[tagName].taggedObjects,
        sceneTagModel: this.taggingModel,
      };

      callQueue.push(
        ...listeners.map((l) => ({
          executionOrder: l.executionOrder,
          callback: () => l.callback(event),
        }))
      );
    }
  }
}
