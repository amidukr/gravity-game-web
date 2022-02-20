import { BackSide, Box3, Group, IcosahedronGeometry, Mesh, Vector3 } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneModel } from "../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { BaseGameSceneLoader } from "../../../common/game/engine/framework/GameLoaderTypes";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";
import { GravitySceneModel } from "../model/GravitySceneModel";
import { AtmospherShaderMaterial as AtmospherBackMaterial } from "../scene/atmosphere/AtmospherMaterial";

export class AtmosphereModule extends BaseGameSceneLoader {
  sceneModel!: GravitySceneModel;
  gameLevel!: GravityGameLevel;
  viewSceneModel!: ThreeJsGameViewSceneModel;

  autowire(application: ApplicationContainer) {
    this.sceneModel = application.getComponent(GravitySceneModel);
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
  }

  startNewGame() {
    const group = new Group();

    console.log("new game");

    const backMaterialPrototype = new AtmospherBackMaterial();
    const backGeometry = new IcosahedronGeometry(1, 10 * 2);

    const star = this.sceneModel.object.sceneDictionary.firstStar;

    const starPosition = star.object.getWorldPosition(new Vector3());

    if (starPosition == undefined) {
      throw new Error("Can't find star position");
    }

    backMaterialPrototype.starPosition = starPosition;

    Object.values(this.sceneModel.object.sceneDictionary.planets).forEach((planet) => {
      const boundingBox = new Box3().setFromObject(planet.object);

      (planet.object as any).material.flatShading = true;

      const planetRadius = planet.radius;

      const atmosphereHeight = planetRadius * 0.05 * 0.5;

      const backMaterial = backMaterialPrototype.clone();

      backMaterial.starPosition = starPosition;

      const backAtmosphereObject = new Mesh(backGeometry, backMaterial);

      backAtmosphereObject.scale.multiplyScalar(planetRadius + atmosphereHeight * 4);

      backMaterial.side = BackSide;

      boundingBox.getCenter(backAtmosphereObject.position);

      group.add(backAtmosphereObject);

      backMaterial.planetCenter = new Vector3().copy(backAtmosphereObject.position);
      backMaterial.planetRadius = planetRadius;
      backMaterial.atmosphereHeight = atmosphereHeight;
    });

    this.viewSceneModel.object.scene.add(group);
  }
}
