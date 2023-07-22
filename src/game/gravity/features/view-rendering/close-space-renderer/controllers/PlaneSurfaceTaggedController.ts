import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { BaseTaggedObjectOnCreateHandler } from "../../../../../../common/game/engine/3rd-party/threejs/scene-graph-controller/utils/BaseTaggedObjectOnCreateHandler";
import { TaggedObject } from "../../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTagIndex";

export const TAG_PLANET_SURFACE = "Tag:PlanetSurface";

export class PlaneSurfaceTaggedController extends BaseTaggedObjectOnCreateHandler {
  override tagSelector(): string[] {
    return [TAG_PLANET_SURFACE];
  }

  override onCreateObject(object: TaggedObject): void {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    cube.userData.name = "Tag:DancingColor";

    object.object.add(cube);
  }
}
