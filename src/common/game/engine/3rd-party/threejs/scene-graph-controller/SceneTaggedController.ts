import { Object3D } from "three";
import { ApplicationContainer } from "../../../../../app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../app/utils/BaseApplicationComponent";
import { addToObjectLst } from "../../../../../utils/CollectionUtils";
import { SceneTaggingModel, TYPE_GameSceneTaggingModel } from "../../../features/rendering/SceneTaggingModel";
import { TaggedObjectOnCreate, TYPE_TaggedObjectOnCreate } from "./handlers/TaggedObjectOnCreate";
import { TaggedObjectOnUpdate, TYPE_TaggedObjectOnUpdate } from "./handlers/TaggedObjectOnUpdate";

export interface RednererArguments {
  scene: Object3D;
}

export class SceneTaggedController extends BaseApplicationComponent {
  private knownObject: Set<Object3D> = new Set<Object3D>();
  taggingModel!: SceneTaggingModel;

  private onCreateListenerByTag: { [tag: string]: TaggedObjectOnCreate<any>[] } = {};
  private onUpdateListenersByTag: { [tag: string]: TaggedObjectOnUpdate<any>[] } = {};

  autowire(container: ApplicationContainer) {
    this.taggingModel = container.getComponent(TYPE_GameSceneTaggingModel);
    this.setupTagSelectorListener(this.onCreateListenerByTag, container.getComponentList(TYPE_TaggedObjectOnCreate));
    this.setupTagSelectorListener(this.onUpdateListenersByTag, container.getComponentList(TYPE_TaggedObjectOnUpdate));
  }

  private setupTagSelectorListener<T extends TaggedObjectOnCreate<any> | TaggedObjectOnUpdate<any>>(listenerByTag: { [tag: string]: T[] }, listeners: T[]) {
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      const tagSelector = listener.tagSelector();
      for (let j = 0; j < tagSelector.length; j++) {
        const tag = tagSelector[j];

        addToObjectLst(listenerByTag, tag.name, listener);
      }
    }
  }

  preRender() {
    this.handleOnCreate();
    this.handleOnUpdate();
  }

  private handleOnUpdate() {
    const tagList = this.taggingModel.getTags();
    for (let i = 0; i < tagList.length; i++) {
      const tag = tagList[i];

      const listeners = this.onUpdateListenersByTag[tag.name];
      if (!listeners) continue;

      const objectList = this.taggingModel.getObjectsByTag(tag);

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

    const tagList = this.taggingModel.getTags();
    for (let i = 0; i < tagList.length; i++) {
      const tag = tagList[i];
      const listeners = this.onCreateListenerByTag[tag.name];
      if (!listeners || listeners.length == 0) continue;

      const objecList = this.taggingModel.getObjectsByTag(tag);
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
