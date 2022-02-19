import { Box3, Vector3 } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BaseGameStateModelLoader } from "../../../common/game/engine/framework/GameLoaderTypes";
import { findObject3dParent } from "../../../common/utils/ThreeJsUtils";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";
import { GravityObject, GravityUniverseModel, newBoundGravityObject, newFixedGravityObject } from "../model/GravityUniverseModel";

export class GravityUniverseLoader extends BaseGameStateModelLoader {
  gameLevel!: GravityGameLevel;
  gravityUniverseModel!: GravityUniverseModel;

  autowire(application: ApplicationContainer) {
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.gravityUniverseModel = application.getComponent(GravityUniverseModel);
  }

  startNewGame(): void | Promise<void> {
    const prefixMap = {
      "Planet-": "planets",
      "Star-": "stars",
    };

    const prefixes = Object.keys(prefixMap);

    prefixes.forEach((prefix) => {
      const prefixCollectionName = (prefixMap as any)[prefix];

      this.gameLevel.object.rootScene.traverse((x) => {
        if (x.name.startsWith(prefix)) {
          const parentObject = findObject3dParent(x, (p) => prefixes.findIndex((prefix) => p.name.startsWith(prefix)) != 1);

          const boundingBox = new Box3().setFromObject(x);
          const size = boundingBox.getSize(new Vector3());
          const radius = Math.max(size.x, size.y, size.z) * 0.5;

          const mass = radius;

          let gravityObject: GravityObject;
          if (parentObject == null) {
            gravityObject = newFixedGravityObject({
              objectId: x.name,
              objectType: prefixCollectionName,
              mass: mass,
              initialPosition: x.getWorldPosition(new Vector3()),
            });
          } else {
            const parentGravityObject = this.gravityUniverseModel.getGravityObject(parent.name);

            gravityObject = newBoundGravityObject(parentGravityObject, {
              objectId: x.name,
              objectType: prefixCollectionName,
              mass: mass,
              initialPosition: x.getWorldPosition(new Vector3()),
            });
          }

          this.gravityUniverseModel.addGravityObject(gravityObject);
        }
      });
    });
  }
}
