import { BackSide, Box3, IcosahedronGeometry, Mesh, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { GameSceneObjectMetaModel, gameSceneObjectTag } from "../../../../../common/game/engine/features/rendering/GameSceneObjectMeta";
import { BaseGameSceneLoader } from "../../../../../common/game/engine/framework/GameLoaderTypes";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../../game-level/GravityGameLevelObject";
import { ATMOSPHERE_TAG } from "../../game-level/GravityGameTags";
import { GravitySpaceObjectsService } from "../../model-calculation/gravity-universe/service/GravitySpaceObjectsService";
import { AtmospherShaderMaterial } from "./material/AtmospherMaterial";

export class AtmosphereLoader extends BaseGameSceneLoader {
  gameLevel!: GravityGameLevel;
  viewSceneModel!: ThreeJsGameViewSceneModel;
  sceneMetaModel!: GameSceneObjectMetaModel;
  gravitySpaceObjects!: GravitySpaceObjectsService;

  autowire(application: ApplicationContainer) {
    this.gravitySpaceObjects = application.getComponent(GravitySpaceObjectsService);
    this.sceneMetaModel = application.getComponent(GameSceneObjectMetaModel);
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
  }

  startNewGame() {
    const backMaterialPrototype = new AtmospherShaderMaterial();
    const backGeometry = new IcosahedronGeometry(1, 10 * 2);

    const star = this.gravitySpaceObjects.findFirstStar();

    const starPosition = star.getWorldPosition(new Vector3());

    if (starPosition == undefined) {
      throw new Error("Can't find star position");
    }

    backMaterialPrototype.starPosition = starPosition;

    this.gravitySpaceObjects.findPlantes().forEach((planet) => {
      const boundingBox = new Box3().setFromObject(planet);

      (planet as any).material.flatShading = true;

      const planetRadius = planet.userData.radius;

      const atmosphereHeight = planetRadius * 0.05 * 0.5;

      const backMaterial = backMaterialPrototype.clone();

      backMaterial.starPosition = starPosition;

      const backAtmosphereObject = new Mesh(backGeometry, backMaterial);

      backAtmosphereObject.scale.multiplyScalar(planetRadius + atmosphereHeight * 4);

      backMaterial.side = BackSide;

      planet.parent!!.add(backAtmosphereObject);

      backMaterial.planetRadius = planetRadius;
      backMaterial.atmosphereHeight = atmosphereHeight;

      this.sceneMetaModel.addTagToObject(backAtmosphereObject, ATMOSPHERE_TAG);
      this.sceneMetaModel.addTagToObject(planet, gameSceneObjectTag(planet.name));

      backAtmosphereObject.userData.planeName = planet.name;
    });
  }
}
