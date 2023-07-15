import { Object3D } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { addToObjectLst } from "../../../../../common/utils/CollectionUtils";
import { TaggedObject } from "./handlers/TaggedObjectEvent";
import { TaggedObjectOnCreate, TYPE_TaggedObjectOnCreate } from "./handlers/TaggedObjectOnCreate";
import { TaggedObjectOnUpdate, TYPE_TaggedObjectOnUpdate } from "./handlers/TaggedObjectOnUpdate";

export interface RednererArguments {
  scene: Object3D;
}

interface TaggedObjectContainer {
  [tag: string]: TaggedObject[];
}

export class ThreeJsSceneGraph {
  private knownObject: Set<Object3D> = new Set<Object3D>();
  private objectsByTag: TaggedObjectContainer = {};

  private onCreateListenerByTag: { [tag: string]: TaggedObjectOnCreate[] } = {};
  private onUpdateListenersByTag: { [tag: string]: TaggedObjectOnUpdate[] } = {};

  setup(container: ApplicationContainer) {
    this.setupTagSelectorListener(this.onCreateListenerByTag, container.getComponentList(TYPE_TaggedObjectOnCreate));
    this.setupTagSelectorListener(this.onUpdateListenersByTag, container.getComponentList(TYPE_TaggedObjectOnUpdate));
  }

  private setupTagSelectorListener<T extends TaggedObjectOnCreate | TaggedObjectOnUpdate>(listenerByTag: { [tag: string]: T[] }, listeners: T[]) {
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      const tagSelector = listener.tagSelector();
      for (let j = 0; j < tagSelector.length; j++) {
        const tag = tagSelector[j];

        addToObjectLst(listenerByTag, tag, listener);
      }
    }
  }

  preRender(args: RednererArguments) {
    this.objectsByTag = {};

    args.scene.traverse((o) => {
      this.indexObject(o);
    });

    this.handleOnCreate();
    this.handleOnUpdate();
  }

  private handleOnUpdate() {
    for (let tag in this.objectsByTag) {
      const listeners = this.onUpdateListenersByTag[tag];
      if (!listeners) continue;

      const objectList = this.objectsByTag[tag];

      if (objectList.length > 0) {
        for (let i = 0; i < listeners.length; i++)
          listeners[i].onUpdate({
            objectList: objectList,
          });
      }
    }
  }

  private handleOnCreate() {
    const reindexedKnowObjects: Set<Object3D> = new Set();

    for (let tag in this.objectsByTag) {
      const listeners = this.onCreateListenerByTag[tag];
      if (!listeners || listeners.length == 0) continue;

      const objecList = this.objectsByTag[tag];
      const newOjbectList = [];

      for (let i = 0; i < objecList.length; i++) {
        const taggedObject = objecList[i];
        const sceneObject = taggedObject.object;

        reindexedKnowObjects.add(sceneObject);

        if (!this.knownObject.has(sceneObject)) {
          newOjbectList.push(taggedObject);
        }
      }

      if (newOjbectList.length > 0) {
        for (let i = 0; i < listeners.length; i++)
          listeners[i].onCreate({
            objectList: newOjbectList,
          });
      }
    }

    this.knownObject = reindexedKnowObjects;
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
