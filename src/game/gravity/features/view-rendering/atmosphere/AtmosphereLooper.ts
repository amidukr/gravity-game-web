import { Mesh, Object3D, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseTaggedObjectOnUpdateHandler } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/utils/BaseTaggedObjectOnUpdateHandler";
import {
  SceneObjectTag,
  sceneObjectTag,
  SceneTaggingModel,
  TaggedObject,
  TYPE_GameSceneTaggingModel,
} from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { ATMOSPHERE_TAG } from "../../game-level/GravityGameTags";
import { GravitySpaceObjectsService } from "../../model-calculation/gravity-universe/service/GravitySpaceObjectsService";
import { AtmospherShaderMaterial } from "./material/AtmospherMaterial";

export class AtmosphereLooper extends BaseTaggedObjectOnUpdateHandler<Mesh> {
  sceneMetaModel!: SceneTaggingModel;
  gravitySpaceObjects!: GravitySpaceObjectsService;

  autowire(application: ApplicationContainer): void {
    this.sceneMetaModel = application.getComponent(TYPE_GameSceneTaggingModel);
    this.gravitySpaceObjects = application.getComponent(GravitySpaceObjectsService);
  }

  override tagSelector(): SceneObjectTag<Mesh>[] {
    return [ATMOSPHERE_TAG];
  }

  override onUpdateObject(object: TaggedObject<Mesh>): void {
    const atmosphereObject = object.object;

    const star = this.gravitySpaceObjects.findFirstStar();
    const planet = this.sceneMetaModel.getFirstObjectByTag(sceneObjectTag<Object3D>(atmosphereObject.userData.planeName)).object;

    const backMaterial = atmosphereObject.material as AtmospherShaderMaterial;

    backMaterial.planetCenter = planet.getWorldPosition(new Vector3());
    backMaterial.starPosition = star.getWorldPosition(new Vector3());
  }
}
