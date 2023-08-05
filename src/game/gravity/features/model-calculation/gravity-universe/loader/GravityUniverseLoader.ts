import { Box3, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { ThreeJsGameLevel, TYPE_ThreeJsGameLevel } from "../../../../../../common/game/engine/3rd-party/threejs/objects/ThreeJsGameLevelObject";
import { sceneObjectTag, SceneTaggingModel, TYPE_GameSceneTaggingModel } from "../../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { BaseGameModelLoader } from "../../../../../../common/game/engine/framework/GameLoaderTypes";
import { filterNotNull, traverseNodeTreeUsingKey } from "../../../../../../common/utils/CollectionUtils";
import { TAG_GravityCenterMass } from "../../../game-level/GravityGameTags";
import { findParentGravityField, saveOriginalObjectTemplate, setGravityFieldPlanet, setPlanetRadius } from "../../gravity-scene-model/UnvirseSceneModel";
import { GravitySpaceObjectsService } from "../service/GravitySpaceObjectsService";
import { GravityUniverseService } from "../service/GravityUniverseService";

export class GravityUniverseLoader extends BaseGameModelLoader {
  gravityUniverseService!: GravityUniverseService;
  metaModel!: SceneTaggingModel;
  gravitySpaceObjects!: GravitySpaceObjectsService;
  gameLevel!: ThreeJsGameLevel;

  autowire(application: ApplicationContainer) {
    this.gravityUniverseService = application.getComponent(GravityUniverseService);
    this.gravitySpaceObjects = application.getComponent(GravitySpaceObjectsService);
    this.metaModel = application.getComponent(TYPE_GameSceneTaggingModel);
    this.gameLevel = application.getComponent(TYPE_ThreeJsGameLevel);
  }

  startNewGame() {
    const metaModel = this.metaModel;

    this.gravitySpaceObjects.findPlantes().forEach((planet) => {
      const boundingBox = new Box3().setFromObject(planet);
      const size = boundingBox.getSize(new Vector3());
      const radius = Math.max(size.x, size.y, size.z) * 0.5;

      setPlanetRadius(planet, radius);

      const parentGravityField = findParentGravityField(planet);

      if (parentGravityField) {
        setGravityFieldPlanet(parentGravityField, planet);
        saveOriginalObjectTemplate(parentGravityField);
      }
    });

    const gravityCenterBodies = metaModel.getObjectsByTag(TAG_GravityCenterMass);

    const gravityGraph = filterNotNull(
      gravityCenterBodies.map((x) => {
        const gravityFieldObject = findParentGravityField(x.object);

        if (gravityFieldObject == null) {
          console.error("Tag:GravityCenterMass without Tag:GravityField", x);
          return;
        }

        const gravityFieldObjectParent = findParentGravityField(gravityFieldObject);
        return {
          gravityFieldCenterMassTag: x,
          gravityField: gravityFieldObject,
          gravityFieldParent: gravityFieldObjectParent,
        };
      })
    );

    gravityGraph.forEach((x) => {
      metaModel.addTagToObject(x.gravityField, sceneObjectTag(x.gravityField.name));
    });

    traverseNodeTreeUsingKey(
      gravityGraph,
      (x) => x.gravityField.name,
      (x) => x.gravityFieldParent?.name || null,
      (x) => {
        const gravityFieldObject = x.gravityField;
        const gravityFieldCenterMassObject = x.gravityFieldCenterMassTag.object.parent!!;
        const parentGravityFieldObject = x.gravityFieldParent;

        const boundingBox = new Box3().setFromObject(gravityFieldCenterMassObject);
        const size = boundingBox.getSize(new Vector3());
        const radius = Math.max(size.x, size.y, size.z) * 0.5;

        const radiusF = radius / 1000000;

        var mass = radiusF * radiusF * radiusF;

        if (gravityFieldObject.name == "TagGravityFieldSun") {
          mass = mass * 1000;
        }

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
