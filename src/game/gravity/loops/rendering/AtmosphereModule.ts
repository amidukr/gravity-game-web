import { Box3, Group, IcosahedronGeometry, Material, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../common/app/ApplicationContainer";
import { Introspection } from "../../../../common/app/lookup/Introspection";
import { GameLoaderModule, TYPE_GameLoaderModule } from "../../../../common/framework/game/loader/GameLoaderModule";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../../level/GravityGameLevelObject";
import { GravitySceneModel } from "../../model/GravitySceneModel";
import { createFrontShader } from "./atmosphere/ShaderFactory";

export class AtmosphereModule implements ApplicationComponent, GameLoaderModule {
  sceneModel!: GravitySceneModel;
  gameLevel!: GravityGameLevel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent)
    Introspection.bindInterfaceName(this, TYPE_GameLoaderModule)
  }

  autowire(application: ApplicationContainer) {
    this.sceneModel = application.getComponent(GravitySceneModel)
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel)
  }

  startNewGame() {
    
    const group = new Group();

    console.log("new game");

    const materialTemplate = createFrontShader();

    // sunPosition

    const firstStarName = Object.keys(this.sceneModel.object.sceneDictionary.stars)[0];
    const star = this.sceneModel.object.sceneDictionary.stars[firstStarName];

    materialTemplate.uniforms.starPosition = {
      value: star.object.getObjectByName("StarLight")?.getWorldPosition(new Vector3()).toArray(),
    };

    Object.values(this.sceneModel.object.sceneDictionary.planets).forEach((planet) => {
      const boundingBox = new Box3().setFromObject(planet.object);

      const size = boundingBox.getSize(new Vector3());
      const atmosphereRadius = Math.max(size.x, size.y, size.z) * 0.5 + 20 * 1000;

      const geometry = new IcosahedronGeometry(atmosphereRadius, 10);

      const material = materialTemplate.clone();
      
      const object = new Mesh(geometry, material);

      boundingBox.getCenter(object.position);

      group.add(object);

      material.uniforms.planetCenter = { value: object.position.toArray() };
      material.uniforms.atmosphereRadius = { value: atmosphereRadius };

      console.log("Material", material);
    });

    this.sceneModel.object.scene.add(group);
  }
}
