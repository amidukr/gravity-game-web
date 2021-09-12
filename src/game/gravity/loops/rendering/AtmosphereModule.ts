import { BackSide, Box3, Group, IcosahedronGeometry, Mesh, Vector3 } from "three";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../common/app/ApplicationContainer";
import { Introspection } from "../../../../common/app/lookup/Introspection";
import { GameLoaderModule, TYPE_GameLoaderModule } from "../../../../common/framework/game/loader/GameLoaderModule";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../../level/GravityGameLevelObject";
import { GravitySceneModel } from "../../model/GravitySceneModel";
import { AtmospherBackShaderMaterial as AtmospherBackMaterial } from "./atmosphere/AtmospherBackMaterial";
import { AtmospherFrontShaderMaterial as AtmospherFrontMaterial } from "./atmosphere/AtmospherFrontMaterial";

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

    const frontMaterialPrototype = new AtmospherFrontMaterial();
    const backMaterialPrototype = new AtmospherBackMaterial();

    // sunPosition

    const firstStarName = Object.keys(this.sceneModel.object.sceneDictionary.stars)[0];
    const star = this.sceneModel.object.sceneDictionary.stars[firstStarName];

    const starPosition = star.object.getObjectByName("StarLight")?.getWorldPosition(new Vector3());

    if (starPosition == undefined) {
      throw new Error("Can't find star position");
    }

    frontMaterialPrototype.starPosition = starPosition;
    backMaterialPrototype.starPosition = starPosition;

    const atmosphereHeight = 300 * 1000;
    const atmosphereInvisibleDepth = 3 * atmosphereHeight;

    Object.values(this.sceneModel.object.sceneDictionary.planets).forEach((planet) => {
      const boundingBox = new Box3().setFromObject(planet.object);

      (planet.object as any).material.flatShading = true;
      //planet.object.visible = false;

      const size = boundingBox.getSize(new Vector3());
      const planetRadius = Math.max(size.x, size.y, size.z) * 0.5;
      const lowerAtmosphereRadius = planetRadius + 20 * 1000;

      const frontGeometry = new IcosahedronGeometry(lowerAtmosphereRadius, 10 * 2);
      const frontMaterial = frontMaterialPrototype.clone();
      const frontAtmosphereObject = new Mesh(frontGeometry, frontMaterial);

      const backGeometry = new IcosahedronGeometry(planetRadius + atmosphereHeight, 10 * 2);
      const backMaterial = backMaterialPrototype.clone();
      const backAtmosphereObject = new Mesh(backGeometry, backMaterial);

      backMaterial.side = BackSide;

      backAtmosphereObject.renderOrder = 1;
      frontAtmosphereObject.renderOrder = 2;

      boundingBox.getCenter(frontAtmosphereObject.position);
      boundingBox.getCenter(backAtmosphereObject.position);

      //group.add(frontAtmosphereObject);
      group.add(backAtmosphereObject);

      frontMaterial.planetCenter = new Vector3().copy(frontAtmosphereObject.position);
      frontMaterial.planetRadius = planetRadius;
      frontMaterial.atmosphereHeight = atmosphereHeight;
      frontMaterial.atmosphereInvisibleDepth = atmosphereInvisibleDepth;

      backMaterial.planetCenter = new Vector3().copy(frontAtmosphereObject.position);
      backMaterial.planetRadius = planetRadius;
      backMaterial.atmosphereHeight = atmosphereHeight;
      backMaterial.atmosphereInvisibleDepth = atmosphereInvisibleDepth;
    });

    this.sceneModel.object.scene.add(group);
  }
}
