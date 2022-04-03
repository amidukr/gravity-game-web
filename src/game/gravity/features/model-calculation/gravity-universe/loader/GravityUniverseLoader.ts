import { Box3, Object3D, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { GameSceneObjectMetaModel, gameSceneObjectTag } from "../../../../../../common/game/engine/features/rendering/GameSceneObjectMeta";
import { BaseGameModelLoader } from "../../../../../../common/game/engine/framework/GameLoaderTypes";
import { filterNull, traverseNodeTreeUsingKey } from "../../../../../../common/utils/CollectionUtils";
import { findObject3dParent } from "../../../../../../common/utils/ThreeJsUtils";
import { GravityUniverseService } from "../service/GravityUniverseService";

export class GravityUniverseLoader extends BaseGameModelLoader {
  gravityUniverseService!: GravityUniverseService;
  metaModel!: GameSceneObjectMetaModel;

  autowire(application: ApplicationContainer) {
    this.gravityUniverseService = application.getComponent(GravityUniverseService);
    this.metaModel = application.getComponent(GameSceneObjectMetaModel);
  }

  startNewGame() {
    const metaModel = this.metaModel;

    // TODO: Rename to Tag:GravityCenterMass
    const gravityCenterBodies = metaModel.getObjectsByTag(gameSceneObjectTag<Object3D>("Tag:GravityCenterBody"));

    const gravityFieldTagName = "Tag:GravityField";

    const gravityGraph = filterNull(
      gravityCenterBodies.map((x) => {
        const gravityFieldObject = findObject3dParent(x, (p) => p.userData.name && p.userData.name.startsWith(gravityFieldTagName));

        if (gravityFieldObject == null) {
          console.error("Tag:GravityCenterBody without Tag:GravityField", x);
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
            initialPosition: gravityFieldObject.getWorldPosition(new Vector3()),
          });
        } else {
          this.gravityUniverseService.addBoundGravityObject(parentGravityFieldObject.name, {
            objectId: gravityFieldObject.name,
            objectType: "Object3D",
            mass: mass,
            initialPosition: gravityFieldObject.getWorldPosition(new Vector3()),
          });
        }
      }
    );
  }
}
