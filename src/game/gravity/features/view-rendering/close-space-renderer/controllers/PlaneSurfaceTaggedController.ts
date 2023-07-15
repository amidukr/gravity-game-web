import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { TaggedObject } from "../../scene-graph-controller/handlers/TaggedObjectEvent";
import { BaseTaggedObjectOnCreateHandler } from "../../scene-graph-controller/utils/BaseTaggedObjectOnCreateHandler";

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
