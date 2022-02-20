import { Box3, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { BaseGameModelLoader } from "../../../../../../common/game/engine/framework/GameLoaderTypes";
import { findObject3dParent } from "../../../../../../common/utils/ThreeJsUtils";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../../game-level/GravityGameLevelObject";
import { GravityUniverseService } from "../service/GravityUniverseService";

export class GravityUniverseLoader extends BaseGameModelLoader {
  gameLevel!: GravityGameLevel;
  gravityUniverseService!: GravityUniverseService;

  autowire(application: ApplicationContainer) {
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.gravityUniverseService = application.getComponent(GravityUniverseService);
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

          this.gravityUniverseService.addFixedGravityObject({
            objectId: x.name,
            objectType: prefixCollectionName,
            mass: mass,
            initialPosition: x.getWorldPosition(new Vector3()),
          });

          /*if (parentObject == null) {
            
          } else {
            this.gravityUniverseService.addBoundGravityObject(parentObject.name, {
              objectId: x.name,
              objectType: prefixCollectionName,
              mass: mass,
              initialPosition: x.getWorldPosition(new Vector3()),
            });
          }*/
        }
      });
    });
  }
}
