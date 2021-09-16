import { BackSide, Box3, Group, IcosahedronGeometry, Mesh, Vector3 } from "three";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../common/app/ApplicationContainer";
import { Introspection } from "../../../../common/app/lookup/Introspection";
import { GameLoaderModule, TYPE_GameLoaderModule } from "../../../../common/framework/game/loader/GameLoaderModule";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../../level/GravityGameLevelObject";
import { GravitySceneModel } from "../../model/GravitySceneModel";
import { AtmospherShaderMaterial as AtmospherBackMaterial } from "./atmosphere/AtmospherMaterial";

export class AtmosphereModule implements ApplicationComponent, GameLoaderModule {
  sceneModel!: GravitySceneModel;
  gameLevel!: GravityGameLevel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
    Introspection.bindInterfaceName(this, TYPE_GameLoaderModule);
  }

  autowire(application: ApplicationContainer) {
    this.sceneModel = application.getComponent(GravitySceneModel);
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
  }

  startNewGame() {
    const group = new Group();

    console.log("new game");

    const backMaterialPrototype = new AtmospherBackMaterial();
    const backGeometry = new IcosahedronGeometry(1, 10 * 2);

    // sunPosition

    const firstStarName = Object.keys(this.sceneModel.object.sceneDictionary.stars)[0];
    const star = this.sceneModel.object.sceneDictionary.stars[firstStarName];

    const starPosition = star.object.getWorldPosition(new Vector3());

    if (starPosition == undefined) {
      throw new Error("Can't find star position");
    }

    backMaterialPrototype.starPosition = starPosition;

    Object.values(this.sceneModel.object.sceneDictionary.planets).forEach((planet) => {
      const boundingBox = new Box3().setFromObject(planet.object);

      (planet.object as any).material.flatShading = true;

      const planetRadius = planet.radius;

      const atmosphereHeight = planetRadius * 0.05;

      
      const backMaterial = backMaterialPrototype.clone();

      backMaterial.starPosition = starPosition;

      const backAtmosphereObject = new Mesh(backGeometry, backMaterial);

      backAtmosphereObject.scale.multiplyScalar(planetRadius + atmosphereHeight);

      backMaterial.side = BackSide;

      boundingBox.getCenter(backAtmosphereObject.position);

      group.add(backAtmosphereObject);

      backMaterial.planetCenter = new Vector3().copy(backAtmosphereObject.position);
      backMaterial.planetRadius = planetRadius;
      backMaterial.atmosphereHeight = atmosphereHeight;
    });

    this.sceneModel.object.scene.add(group);
  }
}
