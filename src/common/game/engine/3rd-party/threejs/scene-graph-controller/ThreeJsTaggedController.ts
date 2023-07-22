import { Object3D } from "three";
import { ApplicationContainer } from "../../../../../app/ApplicationContainer";
import { addToObjectLst } from "../../../../../utils/CollectionUtils";
import { ThreeJsSceneTagIndex } from "../ThreeJsSceneTagIndex";
import { TaggedObjectOnCreate, TYPE_TaggedObjectOnCreate } from "./handlers/TaggedObjectOnCreate";
import { TaggedObjectOnUpdate, TYPE_TaggedObjectOnUpdate } from "./handlers/TaggedObjectOnUpdate";

export interface RednererArguments {
  scene: Object3D;
}

export class ThreeJsTaggedController {
  private knownObject: Set<Object3D> = new Set<Object3D>();
  private tagIndex = new ThreeJsSceneTagIndex();

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
    this.tagIndex.reindex(args.scene);

    this.handleOnCreate();
    this.handleOnUpdate();
  }

  private handleOnUpdate() {
    for (let tag in this.tagIndex.objectsByTag) {
      const listeners = this.onUpdateListenersByTag[tag];
      if (!listeners) continue;

      const objectList = this.tagIndex.objectsByTag[tag];

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

    for (let tag in this.tagIndex.objectsByTag) {
      const listeners = this.onCreateListenerByTag[tag];
      if (!listeners || listeners.length == 0) continue;

      const objecList = this.tagIndex.objectsByTag[tag];
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
}
