import { Mesh, Object3D, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseTaggedObjectOnUpdateHandler } from "../../../../../common/game/engine/3rd-party/threejs/scene-graph-controller/utils/BaseTaggedObjectOnUpdateHandler";
import {
  SceneObjectTag,
  sceneObjectTag,
  SceneTaggingModel,
  TaggedObject,
  TYPE_GameSceneTaggingModel,
} from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { ATMOSPHERE_TAG } from "../../game-level/GravityGameTags";
import { AtmospherShaderMaterial } from "./material/AtmospherMaterial";

export class AtmosphereLooper extends BaseTaggedObjectOnUpdateHandler<Mesh> {
  sceneMetaModel!: SceneTaggingModel;

  autowire(application: ApplicationContainer): void {
    this.sceneMetaModel = application.getComponent(TYPE_GameSceneTaggingModel);
  }

  override tagSelector(): SceneObjectTag<Mesh>[] {
    return [ATMOSPHERE_TAG];
  }

  override onUpdateObject(object: TaggedObject<Mesh>): void {
    const atmosphereObject = object.object;

    const planet = this.sceneMetaModel.getFirstObjectByTag(sceneObjectTag<Object3D>(atmosphereObject.userData.planeName)).object;

    const backMaterial = atmosphereObject.material as AtmospherShaderMaterial;

    backMaterial.planetCenter = planet.getWorldPosition(new Vector3());
  }
}
