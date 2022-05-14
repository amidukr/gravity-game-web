import { BaseGameScene } from "../../framework/GameModelTypes";

export function gameSceneObjectTag<T>(name: string) {
  return new GameSceneObjectTag<T>(name);
}

export class GameSceneObjectTag<T> {
  constructor(readonly name: string) {}
}

class GameSceneObjectMeta {
  weakRefCache = new WeakMap<object, WeakRef<object>>();
  objectsByTag: {
    [tagName: string]: Set<WeakRef<object>>;
  } = {};
}

export class GameSceneObjectMetaModel extends BaseGameScene<GameSceneObjectMeta> {
  construtNewObject(): GameSceneObjectMeta {
    return new GameSceneObjectMeta();
  }

  addTagToObject<T extends object>(o: T, ...tags: GameSceneObjectTag<T>[]) {
    const objectsByTag = this.object.objectsByTag;
    const weakRefCache = this.object.weakRefCache;

    var weakRef = weakRefCache.get(o);
    if (weakRef == undefined) {
      weakRef = new WeakRef(o);
      weakRefCache.set(o, weakRef);
    }

    tags.forEach((tag) => {
      const set = objectsByTag[tag.name] || (objectsByTag[tag.name] = new Set());
      set.add(weakRef!!);
    });
  }

  getObjectsByTag<T extends object>(tag: GameSceneObjectTag<T>): T[] {
    const set = this.object.objectsByTag[tag.name];

    if (set) {
      const values = Array.from(set);
      values.filter((x) => x.deref == undefined).forEach((x) => set.delete(x));

      return values.map((x) => x.deref()).filter((x) => x != undefined) as any;
    } else {
      return [];
    }
  }

  getFirstObjectByTag<T extends object>(tag: GameSceneObjectTag<T>) {
    return this.getObjectsByTag(tag)[0];
  }
}
