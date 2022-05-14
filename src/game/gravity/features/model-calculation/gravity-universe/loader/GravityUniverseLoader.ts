import { Box3, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { GameSceneObjectMetaModel, gameSceneObjectTag } from "../../../../../../common/game/engine/features/rendering/GameSceneObjectMeta";
import { BaseGameModelLoader } from "../../../../../../common/game/engine/framework/GameLoaderTypes";
import { filterNotNull, traverseNodeTreeUsingKey } from "../../../../../../common/utils/CollectionUtils";
import { findObject3dParent } from "../../../../../../common/utils/ThreeJsUtils";
import { GRAVITY_CENTER_MASS, GRAVITY_FIELD_TAG } from "../../../game-level/GravityGameTags";
import { GravitySpaceObjectsService } from "../service/GravitySpaceObjectsService";
import { GravityUniverseService } from "../service/GravityUniverseService";

export class GravityUniverseLoader extends BaseGameModelLoader {
  gravityUniverseService!: GravityUniverseService;
  metaModel!: GameSceneObjectMetaModel;
  gravitySpaceObjects!: GravitySpaceObjectsService;

  autowire(application: ApplicationContainer) {
    this.gravityUniverseService = application.getComponent(GravityUniverseService);
    this.gravitySpaceObjects = application.getComponent(GravitySpaceObjectsService);
    this.metaModel = application.getComponent(GameSceneObjectMetaModel);
  }

  startNewGame() {
    const metaModel = this.metaModel;

    this.gravitySpaceObjects.findPlantes().forEach((planet) => {
      const boundingBox = new Box3().setFromObject(planet);
      const size = boundingBox.getSize(new Vector3());
      const radius = Math.max(size.x, size.y, size.z) * 0.5;

      planet.userData.radius = radius;
    });

    const gravityCenterBodies = metaModel.getObjectsByTag(GRAVITY_CENTER_MASS);

    const gravityFieldTagName = GRAVITY_FIELD_TAG.name;

    const gravityGraph = filterNotNull(
      gravityCenterBodies.map((x) => {
        const gravityFieldObject = findObject3dParent(x, (p) => p.userData.name && p.userData.name.startsWith(gravityFieldTagName));

        if (gravityFieldObject == null) {
          console.error("Tag:GravityCenterMass without Tag:GravityField", x);
          return;
        }

        const gravityFieldObjectParent = findObject3dParent(gravityFieldObject, (p) => p.userData.name && p.userData.name.startsWith(gravityFieldTagName));

        return {
          gravityFieldCenterMassTag: x,
          gravityField: gravityFieldObject,
          gravityFieldParent: gravityFieldObjectParent,
        };
      })
    );

    gravityGraph.forEach((x) => {
      metaModel.addTagToObject(x.gravityField, gameSceneObjectTag(x.gravityField.name));
    });

    traverseNodeTreeUsingKey(
      gravityGraph,
      (x) => x.gravityField.name,
      (x) => x.gravityFieldParent?.name || null,
      (x) => {
        const gravityFieldObject = x.gravityField;
        const gravityFieldCenterMassObject = x.gravityFieldCenterMassTag.parent!!;
        const parentGravityFieldObject = x.gravityFieldParent;

        const boundingBox = new Box3().setFromObject(gravityFieldCenterMassObject);
        const size = boundingBox.getSize(new Vector3());
        const radius = Math.max(size.x, size.y, size.z) * 0.5;

        const mass = radius;

        if (parentGravityFieldObject == null) {
          this.gravityUniverseService.addFixedGravityObject({
            objectId: gravityFieldObject.name,
            objectType: "Object3D",
            mass: mass,
            initialPosition: gravityFieldObject.position.clone(),
          });
        } else {
          this.gravityUniverseService.addBoundGravityObject(parentGravityFieldObject.name, {
            objectId: gravityFieldObject.name,
            objectType: "Object3D",
            mass: mass,
            initialPosition: gravityFieldObject.position.clone(),
          });
        }
      }
    );
  }
}
