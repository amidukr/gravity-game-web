import { Object3D, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../../common/app/utils/BaseApplicationComponent";
import { SceneObjectTag, SceneTaggingModel, TYPE_GameSceneTaggingModel } from "../../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { filterNotNull } from "../../../../../../common/utils/CollectionUtils";
import { TAG_Planet, TAG_Star } from "../../../game-level/GravityGameTags";

export class GravitySpaceObjectsService extends BaseApplicationComponent {
  sceneMetaModel!: SceneTaggingModel;

  autowire(application: ApplicationContainer) {
    this.sceneMetaModel = application.getComponent(TYPE_GameSceneTaggingModel);
  }

  findTagParentObjects(tag: SceneObjectTag<Object3D>): Object3D[] {
    return filterNotNull(this.sceneMetaModel.getObjectsByTag(tag).map((x) => x.object.parent));
  }

  findPlantes(): Object3D[] {
    return this.findTagParentObjects(TAG_Planet);
  }

  findStars(): Object3D[] {
    return this.findTagParentObjects(TAG_Star);
  }

  findFirstStar(): Object3D {
    return this.findStars()[0];
  }

  findClosestPlanet(position: Vector3): Object3D | null {
    const planetList = filterNotNull(this.sceneMetaModel.getObjectsByTag(TAG_Planet).map((x) => x.object.parent));

    var foundDistance = Number.MAX_VALUE;
    var foundPlanet = null;
    for (const planet of planetList) {
      const planetPosition = planet.getWorldPosition(new Vector3());
      const distance = position.distanceTo(planetPosition);

      if (foundPlanet == null || distance < foundDistance) {
        foundPlanet = planet;
        foundDistance = distance;
      }
    }

    return foundPlanet;
  }
}
