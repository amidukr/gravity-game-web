import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../package";

export const TYPE_GameSceneTaggingModel = typeIdentifier<SceneTaggingModel>("GameSceneTaggingModel", PACKAGE_AmidGeFramework);

export interface SceneObjectTag<T> {
  phantom?: T;
  tagName: string;
}

export interface TaggedObject<T> {
  object: T;
  tag: SceneObjectTag<T>;
  objectName: string;
}

export interface SceneObjectContext<T, V> {
  phantom?: { t: T; v: V };
  argumentName: string;
}

export interface SceneTaggingModel {
  addTagToObject<T, O extends T>(o: O, ...tags: SceneObjectTag<T>[]): void;
  getTags(): SceneObjectTag<any>[];
  getObjectsByTag<T>(tag: SceneObjectTag<T>): TaggedObject<T>[];
  getFirstObjectByTag<T>(tag: SceneObjectTag<T>): TaggedObject<T> | undefined;

  setContextArgument<T, V>(o: T, argument: SceneObjectContext<T, V>, value: V): void;
  getContextArgument<T, V>(o: T, argument: SceneObjectContext<T, V>): V | undefined;
}

const __tagCache: {
  [tag: string]: SceneObjectTag<any>;
} = {};

export function sceneObjectTag<T>(tagName: string): SceneObjectTag<T> {
  var tag = __tagCache[tagName];

  if (tag == undefined) {
    __tagCache[tagName] = tag = { tagName: tagName };
  }

  return tag;
}

const __sceneObjectContextCache: {
  [tag: string]: SceneObjectContext<any, any>;
} = {};

export function sceneObjectContext<T, V>(argumentName: string): SceneObjectContext<T, V> {
  var argument = __sceneObjectContextCache[argumentName];

  if (argument == undefined) {
    __sceneObjectContextCache[argumentName] = argument = { argumentName: argumentName };
  }

  return argument;
}
