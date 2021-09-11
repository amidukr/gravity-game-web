import { Box3, Group, IcosahedronGeometry, Mesh, Vector3 } from "three";
import { ApplicationContainer } from "../../../../common/app/ApplicationContainer";
import { TYPE_GravityGameLevel } from "../../level/GravityGameLevelObject";
import { GravitySceneModel } from "../../model/GravitySceneModel";
import { createFrontShader } from "./atmosphere/ShaderFactory";

export class AtmosphereRenderer {
  startNewGame(application: ApplicationContainer) {
    const sceneModel = application.getComponent(GravitySceneModel);
    const level = application.getComponent(TYPE_GravityGameLevel);

    const group = new Group();

    console.log("new game");

    const materialTemplate = createFrontShader();

    // sunPosition

    const firstStarName = Object.keys(sceneModel.object.sceneDictionary.stars)[0];
    const star = sceneModel.object.sceneDictionary.stars[firstStarName];

    materialTemplate.uniforms.starPosition = {
      value: star.object.getObjectByName("StarLight")?.getWorldPosition(new Vector3()).toArray(),
    };

    Object.values(sceneModel.object.sceneDictionary.planets).forEach((planet) => {
      console.log("planet: ", planet.object.name);

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

    sceneModel.object.scene.add(group);
  }
}
