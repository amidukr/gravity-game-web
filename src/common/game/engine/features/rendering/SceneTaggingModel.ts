import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../package";

export const TYPE_GameSceneTaggingModel = typeIdentifier<SceneTaggingModel>("GameSceneTaggingModel", PACKAGE_AmidGeFramework);

export interface SceneObjectTag<T> {
  name: string;
}

export interface TaggedObject<T> {
  object: T;
  tag: SceneObjectTag<T>;
  name: string;
}

export interface SceneTaggingModel {
  addTagToObject<T extends object>(o: T, ...tags: SceneObjectTag<T>[]): void;
  getTags(): SceneObjectTag<any>[];
  getObjectsByTag<T extends object>(tag: SceneObjectTag<T>): TaggedObject<T>[];
  getFirstObjectByTag<T extends object>(tag: SceneObjectTag<T>): TaggedObject<T> | undefined;
}

const __tagCache: {
  [tag: string]: SceneObjectTag<any>;
} = {};

export function sceneObjectTag<T>(name: string): SceneObjectTag<T> {
  var tag = __tagCache[name];

  if (tag == undefined) {
    __tagCache[name] = tag = { name: name };
  }

  return tag;
}
