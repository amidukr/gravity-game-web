import { Object3D } from "three";

export interface TaggedObject {
  object: Object3D;
  tag: string;
  name: string;
}

interface TaggedObjectContainer {
  [tag: string]: TaggedObject[];
}

export class ThreeJsSceneTagIndex {
  objectsByTag: TaggedObjectContainer = {};

  reindex(root: Object3D) {
    this.objectsByTag = {};

    root.traverse((o) => {
      this.indexObject(o);
    });
  }

  private indexObject(o: Object3D) {
    const name: string = o.userData.name;

    if (!name || !name.startsWith("Tag:")) return;

    const pointIndexOf = name.indexOf(".");

    const tag = pointIndexOf == -1 ? name : name.substring(0, pointIndexOf);

    var objects = this.objectsByTag[tag];

    if (objects == undefined) {
      this.objectsByTag[tag] = objects = [];
    }

    objects.push({
      object: o,
      tag: tag,
      name: name,
    });
  }
}
