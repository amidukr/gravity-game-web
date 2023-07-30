import { BackSide, IcosahedronGeometry, Mesh, Object3D, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { SceneSubscribeContext } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/SceneSubscribeContext";
import { TaggedObjectEvent } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedObjectEvent";
import { TaggedSceneController } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneController";
import {
  sceneObjectTag,
  SceneTaggingModel,
  TaggedObject,
  TYPE_GameSceneTaggingModel,
} from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { GravityConfiguration } from "../../../configuration/GravityConfiguration";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../../game-level/GravityGameLevelObject";
import { ATMOSPHERE_TAG, PLANET_TAG } from "../../game-level/GravityGameTags";
import { GravitySpaceObjectsService } from "../../model-calculation/gravity-universe/service/GravitySpaceObjectsService";
import { AtmospherShaderMaterial } from "./material/AtmospherMaterial";

export class AtmosphereController extends TaggedSceneController {
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

  override subscribe(ctx: SceneSubscribeContext): void {
    ctx.registerOnAdd([PLANET_TAG], this.onPlanetAdd.bind(this));
    ctx.registerOnAddEach([ATMOSPHERE_TAG], this.onAtmosphereUpdate.bind(this));
  }

  onAtmosphereUpdate(object: TaggedObject<Mesh>): void {
    const atmosphereObject = object.object;

    const star = this.gravitySpaceObjects.findFirstStar();
    const planet = this.sceneMetaModel.getFirstObjectByTag(sceneObjectTag<Object3D>(atmosphereObject.userData.planeName))!!.object;

    const backMaterial = atmosphereObject.material as AtmospherShaderMaterial;

    backMaterial.planetCenter = planet.getWorldPosition(new Vector3());
    backMaterial.starPosition = star.getWorldPosition(new Vector3());
  }

  onPlanetAdd(event: TaggedObjectEvent<Object3D>): void {
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

      if (GravityConfiguration.hidePlanets) {
        planet.visible = false;
      }

      backAtmosphereObject.name = "Atmo" + planet.name;

      backMaterial.planetRadius = planetRadius;
      backMaterial.atmosphereHeight = atmosphereHeight;

      this.sceneMetaModel.addTagToObject(backAtmosphereObject, ATMOSPHERE_TAG);
      this.sceneMetaModel.addTagToObject(planet, sceneObjectTag(planet.name));

      backAtmosphereObject.userData.planeName = planet.name;
    });
  }
}
