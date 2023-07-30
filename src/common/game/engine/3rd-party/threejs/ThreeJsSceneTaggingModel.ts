import { Object3D } from "three";
import { Introspection } from "../../../../app/lookup/Introspection";
import { SceneObjectTag, sceneObjectTag, SceneTaggingModel, TaggedObject, TYPE_GameSceneTaggingModel } from "../../features/rendering/SceneTaggingModel";

interface TaggedObjectContainer {
  [tag: string]: TaggedObject<any>[];
}

function collectTagList(o: Object3D): string[] {
  const tagList: string[] = [];
  const name: string = o.userData.name;

  if (name != undefined && name.startsWith == undefined) {
    console.info("Undefined name for object", o);
  }

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
    o.userData.__tagSet = new Set(tagList);
  }

  return tagList;
}

export function threeJsSetTagName<T extends Object3D>(o: T, tagName: SceneObjectTag<T>, name?: string) {
  o.userData.name = name ? tagName.name + "." + name : tagName.name;
}

export function threeJsAddTag<T extends Object3D>(o: T, ...tags: SceneObjectTag<T>[]): void {
  const objectTags = getTagList(o);
  const tagNames = tags.map((t) => t.name);
  objectTags.push(...tagNames);
  const tagSet = o.userData.__tagSet;
  tags.forEach(tagSet.add.bind(tagSet), tagNames);
}

export function threeJsIsTaggged<T extends Object3D>(o: T, tag: SceneObjectTag<T>): boolean {
  getTagList(o);

  return o.userData.__tagSet.has(tag.name);
}

export class ThreeJsSceneTaggingModel implements SceneTaggingModel {
  objectsByTag: TaggedObjectContainer = {};
  private tags: SceneObjectTag<any>[] = [];

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameSceneTaggingModel);
  }

  reindex(root: Object3D) {
    this.objectsByTag = {};

    root.traverse((o) => {
      this.indexObject(o);
    });

    this.tags = [];
    for (const key in this.objectsByTag) {
      this.tags.push(sceneObjectTag(key));
    }
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
        tag: sceneObjectTag(tag),
        name: name,
      });
    }
  }

  getTags(): SceneObjectTag<any>[] {
    return this.tags;
  }

  addTagToObject<T extends object>(o: T, ...tags: SceneObjectTag<T>[]): void {
    threeJsAddTag(o as Object3D, ...tags);
  }

  getObjectsByTag<T extends object>(tag: SceneObjectTag<T>): TaggedObject<T>[] {
    return this.objectsByTag[tag.name] || [];
  }

  getFirstObjectByTag<T extends object>(tag: SceneObjectTag<T>): TaggedObject<T> | undefined {
    return this.getObjectsByTag(tag)[0];
  }
}
