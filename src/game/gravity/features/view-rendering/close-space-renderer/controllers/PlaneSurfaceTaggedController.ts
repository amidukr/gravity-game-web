import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { TaggedObject } from "../../scene-graph-controller/handlers/TaggedObjectEvent";
import { BaseTaggedObjectOnCreateHandler } from "../../scene-graph-controller/utils/BaseTaggedObjectOnCreateHandler";
import { BaseTaggedObjectOnUpdateHandler } from "../../scene-graph-controller/utils/BaseTaggedObjectOnUpdateHandler";

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

export class ColorfulTaggedController extends BaseTaggedObjectOnUpdateHandler {
  tagSelector(): string[] {
    return ["Tag:DancingColor"];
  }

  onUpdateObject(object: TaggedObject): void {
    const material: MeshBasicMaterial = (object.object as Mesh).material as MeshBasicMaterial;
    material.color.r += Math.random() * 0.2 - 0.2 / 2;
    material.color.g += Math.random() * 0.2 - 0.2 / 2;
    material.color.b += Math.random() * 0.2 - 0.2 / 2;

    material.color.r = Math.min(Math.max(material.color.r, 0), 1);
    material.color.g = Math.min(Math.max(material.color.g, 0), 1);
    material.color.b = Math.min(Math.max(material.color.b, 0), 1);
  }
}
