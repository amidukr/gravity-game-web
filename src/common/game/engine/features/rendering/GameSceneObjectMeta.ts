import { BaseGameScene } from "../../framework/GameModelTypes";

export function gameSceneObjectType<T>(name: string) {
  return new GameSceneObjectType<T>(name);
}

export class GameSceneObjectType<T> {
  constructor(readonly name: string) {}
}

class GameSceneObjectMeta {
  weakRefCache = new WeakMap<object, WeakRef<object>>();
  objectsByType: {
    [typeName: string]: Set<WeakRef<object>>;
  } = {};
}

export class GameSceneObjectMetaModel extends BaseGameScene<GameSceneObjectMeta> {
  construtNewObject(): GameSceneObjectMeta {
    return new GameSceneObjectMeta();
  }

  addTypeToObject<T extends object>(o: T, ...types: GameSceneObjectType<T>[]) {
    const objectsByType = this.object.objectsByType;
    const weakRefCache = this.object.weakRefCache;

    var weakRef = weakRefCache.get(o);
    if (weakRef == undefined) {
      weakRef = new WeakRef(o);
      weakRefCache.set(o, weakRef);
    }

    types.forEach((type) => {
      const set = objectsByType[type.name] || (objectsByType[type.name] = new Set());
      set.add(weakRef!!);
    });
  }

  getObjectsByType<T extends object>(type: GameSceneObjectType<T>): T[] {
    const set = this.object.objectsByType[type.name];

    if (set) {
      const values = Array.from(set);
      values.filter((x) => x.deref == undefined).forEach((x) => set.delete(x));

      return values.map((x) => x.deref()).filter((x) => x != undefined) as any;
    } else {
      return [];
    }
  }
}
