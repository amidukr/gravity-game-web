import { Object3D } from "three";
import { Introspection } from "../../../../app/lookup/Introspection";
import {
  GameSceneObjectMetaModel,
  GameSceneObjectTag,
  gameSceneObjectTag,
  TaggedObject,
  TYPE_GameSceneObjectMetaModel,
} from "../../features/rendering/GameSceneObjectMeta";

interface TaggedObjectContainer {
  [tag: string]: TaggedObject<any>[];
}

function collectTagList(o: Object3D): string[] {
  const tagList: string[] = [];
  const name: string = o.userData.name;

  if (!name || !name.startsWith("Tag:")) return tagList;

  const pointIndexOf = name.indexOf(".");

  const tag = pointIndexOf == -1 ? name : name.substring(0, pointIndexOf);

  tagList.push(tag);

  return tagList;
}

function getTagList(o: Object3D): string[] {
  var tagList = o.userData.__tagList;
  if (tagList == undefined) {
    o.userData.__tagList = tagList = collectTagList(o);
  }

  return tagList;
}

export class ThreeJsSceneTagIndex implements GameSceneObjectMetaModel {
  objectsByTag: TaggedObjectContainer = {};

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameSceneObjectMetaModel);
  }

  reindex(root: Object3D) {
    this.objectsByTag = {};

    root.traverse((o) => {
      this.indexObject(o);
    });
  }

  private indexObject(o: Object3D) {
    const tagList = getTagList(o);

    if (tagList.length == 0) return;

    const name: string = o.userData.name;

    for (var i = 0; i < tagList.length; i++) {
      const tag = tagList[i];
      var objects = this.objectsByTag[tag];

      if (objects == undefined) {
        this.objectsByTag[tag] = objects = [];
      }

      objects.push({
        object: o,
        tag: gameSceneObjectTag(tag),
        name: name,
      });
    }
  }

  addTagToObject<T extends object>(o: T, ...tags: GameSceneObjectTag<T>[]): void {
    const objectTags = getTagList(o as Object3D);
    objectTags.push.apply(
      objectTags,
      tags.map((t) => t.name)
    );
  }

  getObjectsByTag<T extends object>(tag: GameSceneObjectTag<T>): TaggedObject<T>[] {
    return this.objectsByTag[tag.name] || [];
  }

  getFirstObjectByTag<T extends object>(tag: GameSceneObjectTag<T>): TaggedObject<T> {
    return this.getObjectsByTag(tag)[0];
  }
}
