import { typeIdentifier } from "../../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../../package";

export const TYPE_GameSceneObjectMetaModel = typeIdentifier<GameSceneObjectMetaModel>("GameSceneObjectMetaModel", PACKAGE_AmidGeFramework);

const __tagCache: {
  [tag: string]: GameSceneObjectTag<any>;
} = {};

export function gameSceneObjectTag<T>(name: string) {
  var tag = __tagCache[name];

  if (tag == undefined) {
    __tagCache[name] = tag = new GameSceneObjectTag<T>(name);
  }

  return tag;
}

export class GameSceneObjectTag<T> {
  constructor(readonly name: string) {}
}

export interface TaggedObject<T> {
  object: T;
  tag: GameSceneObjectTag<T>;
  name: string;
}

export interface GameSceneObjectMetaModel {
  addTagToObject<T extends object>(o: T, ...tags: GameSceneObjectTag<T>[]): void;
  getObjectsByTag<T extends object>(tag: GameSceneObjectTag<T>): TaggedObject<T>[];
  getFirstObjectByTag<T extends object>(tag: GameSceneObjectTag<T>): TaggedObject<T>;
}
