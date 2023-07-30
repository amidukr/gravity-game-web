import { Object3D } from "three";
import { ApplicationContainer } from "../../../../../app/ApplicationContainer";
import { typeIdentifier } from "../../../../../app/lookup/TypeIdentifier";
import { BaseApplicationComponent } from "../../../../../app/utils/BaseApplicationComponent";
import { PACKAGE_AmidGeFramework } from "../../../../../package";
import { addToObjectLst } from "../../../../../utils/CollectionUtils";
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

interface TagCache {
  [tag: string]: {
    tag: SceneObjectTag<any>;
    taggedObjects: TaggedObject<any>[];
    objects: Set<any>;
  };
}

export class TaggedSceneEngine extends BaseApplicationComponent {
  private previousRun: TagCache = {};

  taggingModel!: SceneTaggingModel;

  private onTagDeleteListenerByTag: { [tag: string]: TaggedObjectEventCallback<any>[] } = {};
  private onTagAddListenerByTag: { [tag: string]: TaggedObjectEventCallback<any>[] } = {};
  private onTagUpdateListenersByTag: { [tag: string]: TaggedObjectEventCallback<any>[] } = {};

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

  registerOnDelete<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>): void {
    tags.forEach((x) => addToObjectLst(this.onTagDeleteListenerByTag, x.name, handler));
  }

  registerOnAdd<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>): void {
    tags.forEach((x) => addToObjectLst(this.onTagAddListenerByTag, x.name, handler));
  }

  registerOnUpdate<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>): void {
    tags.forEach((x) => addToObjectLst(this.onTagUpdateListenersByTag, x.name, handler));
  }

  preRender() {
    const taggedCache = this.buildTagCache();

    this.handlerOnTagDelete(taggedCache);
    this.handleOnTagAdd(taggedCache);
    this.handleOnTagUpdate(taggedCache);

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

  private handlerOnTagDelete(tagCache: TagCache) {
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

        listeners.forEach((l) => l(event));
      }
    }
  }

  private handleOnTagAdd(tagCache: TagCache) {
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

        listeners.forEach((l) => l(event));
      }
    }
  }

  private handleOnTagUpdate(tagCache: TagCache) {
    for (let tagName in tagCache) {
      const listeners = this.onTagUpdateListenersByTag[tagName];
      if (!listeners || listeners.length == 0) continue;

      const event: TaggedObjectEvent<any> = {
        objectList: tagCache[tagName].taggedObjects,
        sceneTagModel: this.taggingModel,
      };

      listeners.forEach((l) => l(event));
    }
  }
}