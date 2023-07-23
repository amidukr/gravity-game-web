import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";
import { BaseTaggedObjectOnCreateHandler } from "../../../../../../common/game/engine/3rd-party/threejs/scene-graph-controller/utils/BaseTaggedObjectOnCreateHandler";
import { gameSceneObjectTag, TaggedObject } from "../../../../../../common/game/engine/features/rendering/GameSceneObjectMeta";

export const TAG_PLANET_SURFACE = gameSceneObjectTag("Tag:PlanetSurface");

export class PlaneSurfaceTaggedController extends BaseTaggedObjectOnCreateHandler<Object3D> {
  override tagSelector() {
    return [TAG_PLANET_SURFACE];
  }

  override onCreateObject(object: TaggedObject<Object3D>): void {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    cube.userData.name = "Tag:DancingColor";

    object.object.add(cube);
  }
}
