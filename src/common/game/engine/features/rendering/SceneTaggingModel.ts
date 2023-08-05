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

export interface ObjectContextArgument<T, V> {
  phantom?: { t: T; v: V };
  argumentName: string;
}

export interface SceneTaggingModel {
  addTagToObject<T, O extends T>(o: O, ...tags: SceneObjectTag<T>[]): void;
  getTags(): SceneObjectTag<any>[];
  getObjectsByTag<T>(tag: SceneObjectTag<T>): TaggedObject<T>[];
  getFirstObjectByTag<T>(tag: SceneObjectTag<T>): TaggedObject<T> | undefined;
  getContextArgument<T, V>(o: T, argument: ObjectContextArgument<T, V>): V;
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

const __objectContextArgumentCache: {
  [tag: string]: ObjectContextArgument<any, any>;
} = {};

export function objectContextArgument<T, V>(argumentName: string): ObjectContextArgument<T, V> {
  var argument = __objectContextArgumentCache[argumentName];

  if (argument == undefined) {
    __objectContextArgumentCache[argumentName] = argument = { argumentName: argumentName };
  }

  return argument;
}
