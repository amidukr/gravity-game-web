import { Object3D } from "three";
import { Introspection } from "../../../../app/lookup/Introspection";
import { findObject3dParent } from "../../../../utils/ThreeJsUtils";
import {
  SceneObjectContext,
  SceneObjectTag,
  sceneObjectTag,
  SceneTaggingModel,
  TaggedObject,
  TYPE_GameSceneTaggingModel,
} from "../../features/rendering/SceneTaggingModel";

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
  }

  if (!(o.userData.__tagSet instanceof Set)) {
    o.userData.__tagSet = new Set(tagList);
  }

  return tagList;
}

export function threeJsSetTagName<T extends Object3D, O extends T>(o: O, tagName: SceneObjectTag<T>, name?: string) {
  o.userData.name = name ? tagName.tagName + "." + name : tagName.tagName;
}

export function threeJsCleanTags(o: Object3D) {
  delete o.userData["name"];
  delete o.userData["__tagList"];
  delete o.userData["__tagSet"];
}

export function threeJsAddTag<T extends Object3D, O extends T>(o: O, ...tags: SceneObjectTag<T>[]): void {
  const objectTags = getTagList(o);
  const tagNames = tags.map((t) => t.tagName);
  objectTags.push(...tagNames);
  const tagSet = o.userData.__tagSet;
  tagNames.forEach(tagSet.add.bind(tagSet));
}

export function threeJsIsTaggged<T extends Object3D, O extends T>(o: O, tag: SceneObjectTag<T>): boolean {
  getTagList(o);

  return o.userData.__tagSet.has(tag.tagName);
}

export function threeJsSetContextArgument<T extends Object3D, V>(o: T, argument: SceneObjectContext<T, V>, value: V): void {
  var context = o.userData.__context;
  if (context == undefined) {
    o.userData.__context = context = {};
  }

  context[argument.argumentName] = value;
}

export function threeJsGetContextArgument<T extends Object3D, V>(o: T, argument: SceneObjectContext<T, V>): V | undefined {
  const argumentName = argument.argumentName;
  var nextObject: Object3D | null = o;
  while (nextObject) {
    const context = nextObject.userData.__context;
    if (context && context.hasOwnProperty(argumentName)) return context[argumentName];

    nextObject = nextObject.parent;
  }

  return undefined;
}

export function threeJsFindTaggedParent<T>(object: Object3D, tag: SceneObjectTag<T>): T | null {
  return findObject3dParent(object, (p) => threeJsIsTaggged(p as any, tag as any)) as any;
}
export class ThreeJsSceneTaggingModel implements SceneTaggingModel {
  root!: Object3D;
  objectsByTag: TaggedObjectContainer = {};
  private tags: SceneObjectTag<any>[] = [];

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameSceneTaggingModel);
  }

  reindex() {
    this.objectsByTag = {};

    this.root.traverse((o) => {
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
        objectName: name,
      });
    }
  }

  getTags(): SceneObjectTag<any>[] {
    return this.tags;
  }

  addTagToObject<T, O extends T>(o: O, ...tags: SceneObjectTag<T>[]): void {
    threeJsAddTag(o as any, ...(tags as any));
  }

  getObjectsByTag<T>(tag: SceneObjectTag<T>): TaggedObject<T>[] {
    return this.objectsByTag[tag.tagName] || [];
  }

  getFirstObjectByTag<T>(tag: SceneObjectTag<T>): TaggedObject<T> | undefined {
    return this.getObjectsByTag(tag)[0];
  }

  setContextArgument<T, V>(o: T, argument: SceneObjectContext<T, V>, value: V): void {
    threeJsSetContextArgument(o as any, argument as any, value);
  }

  getContextArgument<T, V>(o: T, argument: SceneObjectContext<T, V>): V | undefined {
    return threeJsGetContextArgument(o as any, argument);
  }
}
