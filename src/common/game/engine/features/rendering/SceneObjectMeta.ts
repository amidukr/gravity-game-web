import { BaseGameScene } from "../../framework/GameModelTypes";

export function sceneObjectType<T>(name: string) {
  return new SceneObjectType<T>(name);
}

export class SceneObjectType<T> {
  constructor(readonly name: string) {}
}

class SceneObjectMeta {
  weakRefCache = new WeakMap<object, WeakRef<object>>();
  objectsByType: {
    [typeName: string]: Set<WeakRef<object>>;
  } = {};
}

export class SceneObjectMetaModel extends BaseGameScene<SceneObjectMeta> {
  construtNewObject(): SceneObjectMeta {
    return new SceneObjectMeta();
  }

  addTypeToObject<T extends object>(o: T, ...types: SceneObjectType<T>[]) {
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

  getObjectsByType<T extends object>(type: SceneObjectType<T>): T[] {
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
