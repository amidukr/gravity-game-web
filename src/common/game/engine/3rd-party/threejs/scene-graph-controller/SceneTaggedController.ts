import { Object3D } from "three";
import { ApplicationContainer } from "../../../../../app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../app/utils/BaseApplicationComponent";
import { addToObjectLst } from "../../../../../utils/CollectionUtils";
import { SceneObjectTag, SceneTaggingModel, TYPE_GameSceneTaggingModel } from "../../../features/rendering/SceneTaggingModel";
import { TaggedObjectEvent } from "./handlers/TaggedObjectEvent";
import { TYPE_TaggedObjectOnCreate } from "./handlers/TaggedObjectOnCreate";
import { TYPE_TaggedObjectOnUpdate } from "./handlers/TaggedObjectOnUpdate";
import { TYPE_TaggedObjectHandler } from "./utils/TaggedObjectHandler";

export interface RednererArguments {
  scene: Object3D;
}

export type TaggedObjectEventCallback<T> = (event: TaggedObjectEvent<T>) => void;

export class SceneTaggedController extends BaseApplicationComponent {
  private knownObject: Set<Object3D> = new Set<Object3D>();
  taggingModel!: SceneTaggingModel;

  private onCreateListenerByTag: { [tag: string]: TaggedObjectEventCallback<any>[] } = {};
  private onUpdateListenersByTag: { [tag: string]: TaggedObjectEventCallback<any>[] } = {};

  autowire(container: ApplicationContainer) {
    this.taggingModel = container.getComponent(TYPE_GameSceneTaggingModel);

    container.getComponentList(TYPE_TaggedObjectOnCreate).forEach((x) => this.registerOnCreate(x.tagSelector(), x.onCreate.bind(x)));
    container.getComponentList(TYPE_TaggedObjectOnUpdate).forEach((x) => this.registerOnUpdate(x.tagSelector(), x.onUpdate.bind(x)));

    container.getComponentList(TYPE_TaggedObjectHandler).forEach((x) => {
      x.taggedController = this;
      x.subscribe();
    });
  }

  registerOnCreate<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>): void {
    tags.forEach((x) => addToObjectLst(this.onCreateListenerByTag, x.name, handler));
  }

  registerOnUpdate<T>(tags: SceneObjectTag<T>[], handler: TaggedObjectEventCallback<T>): void {
    tags.forEach((x) => addToObjectLst(this.onUpdateListenersByTag, x.name, handler));
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
          listeners[i]({
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
          listeners[i]({
            objectList: newOjbectList,
          });
      }
    }

    this.knownObject = reindexedKnowObjects;
  }
}
