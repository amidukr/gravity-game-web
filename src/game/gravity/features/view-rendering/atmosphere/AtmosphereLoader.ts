import { BackSide, IcosahedronGeometry, Mesh, Object3D, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { TaggedObjectEvent } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/handlers/TaggedObjectEvent";
import { BaseTaggedObjectOnCreateHandler } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/utils/BaseTaggedObjectOnCreateHandler";
import { sceneObjectTag, SceneTaggingModel, TYPE_GameSceneTaggingModel } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../../game-level/GravityGameLevelObject";
import { ATMOSPHERE_TAG, PLANET_TAG } from "../../game-level/GravityGameTags";
import { GravitySpaceObjectsService } from "../../model-calculation/gravity-universe/service/GravitySpaceObjectsService";
import { AtmospherShaderMaterial } from "./material/AtmospherMaterial";

export class AtmosphereLoader extends BaseTaggedObjectOnCreateHandler<Object3D> {
  gameLevel!: GravityGameLevel;
  viewSceneModel!: ThreeJsGameViewSceneModel;
  sceneMetaModel!: SceneTaggingModel;
  gravitySpaceObjects!: GravitySpaceObjectsService;

  autowire(application: ApplicationContainer) {
    this.gravitySpaceObjects = application.getComponent(GravitySpaceObjectsService);
    this.sceneMetaModel = application.getComponent(TYPE_GameSceneTaggingModel);
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
  }

  override tagSelector() {
    return [PLANET_TAG];
  }
  override onCreateObject(): void {}

  override onCreate(event: TaggedObjectEvent<Object3D>): void {
    const backMaterialPrototype = new AtmospherShaderMaterial();
    const backGeometry = new IcosahedronGeometry(1, 10 * 2);

    const star = this.gravitySpaceObjects.findFirstStar();

    const starPosition = star.getWorldPosition(new Vector3());

    if (starPosition == undefined) {
      throw new Error("Can't find star position");
    }

    backMaterialPrototype.starPosition = starPosition;

    this.gravitySpaceObjects.findPlantes().forEach((planet) => {
      (planet as any).material.flatShading = true;

      const planetRadius = planet.userData.radius;

      const atmosphereHeight = planetRadius * 0.05 * 0.5;

      const backMaterial = backMaterialPrototype.clone();

      backMaterial.starPosition = starPosition.clone();

      const backAtmosphereObject = new Mesh(backGeometry, backMaterial);

      backAtmosphereObject.scale.multiplyScalar(planetRadius + atmosphereHeight * 4);

      backMaterial.side = BackSide;

      planet.parent!!.add(backAtmosphereObject);

      backAtmosphereObject.name = "Atmo" + planet.name;

      backMaterial.planetRadius = planetRadius;
      backMaterial.atmosphereHeight = atmosphereHeight;

      this.sceneMetaModel.addTagToObject(backAtmosphereObject, ATMOSPHERE_TAG);
      this.sceneMetaModel.addTagToObject(planet, sceneObjectTag(planet.name));

      backAtmosphereObject.userData.planeName = planet.name;
    });
  }
}
