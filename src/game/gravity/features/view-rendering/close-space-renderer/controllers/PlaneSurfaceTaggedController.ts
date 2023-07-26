import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";
import { threeJsSetTagName } from "../../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { BaseTaggedObjectOnCreateHandler } from "../../../../../../common/game/engine/features/rendering/scene-graph-controller/utils/BaseTaggedObjectOnCreateHandler";
import { sceneObjectTag, TaggedObject } from "../../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { TAG_DancingColor } from "./ColorfulTaggedController";

export const TAG_PLANET_SURFACE = sceneObjectTag("Tag:PlanetSurface");

export class PlaneSurfaceTaggedController extends BaseTaggedObjectOnCreateHandler<Object3D> {
  override tagSelector() {
    return [TAG_PLANET_SURFACE];
  }

  override onCreateObject(object: TaggedObject<Object3D>): void {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    threeJsSetTagName(cube, TAG_DancingColor, "close");

    object.object.add(cube);
  }
}
