import { Object3D, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../../common/app/utils/BaseApplicationComponent";
import { GameSceneObjectMetaModel, GameSceneObjectTag } from "../../../../../../common/game/engine/features/rendering/GameSceneObjectMeta";
import { filterNotNull } from "../../../../../../common/utils/CollectionUtils";
import { PLANET_TAG, STAR_TAG } from "../../../game-level/GravityGameTags";

export class GravitySpaceObjectsService extends BaseApplicationComponent {
  sceneMetaModel!: GameSceneObjectMetaModel;

  autowire(application: ApplicationContainer) {
    this.sceneMetaModel = application.getComponent(GameSceneObjectMetaModel);
  }

  findTagParentObjects(tag: GameSceneObjectTag<Object3D>): Object3D[] {
    return filterNotNull(this.sceneMetaModel.getObjectsByTag(tag).map((x) => x.parent));
  }

  findPlantes(): Object3D[] {
    return this.findTagParentObjects(PLANET_TAG);
  }

  findStars(): Object3D[] {
    return this.findTagParentObjects(STAR_TAG);
  }

  findFirstStar(): Object3D {
    return this.findStars()[0];
  }

  findClosestPlanet(position: Vector3): Object3D | null {
    const planetList = filterNotNull(this.sceneMetaModel.getObjectsByTag(PLANET_TAG).map((x) => x.parent));

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