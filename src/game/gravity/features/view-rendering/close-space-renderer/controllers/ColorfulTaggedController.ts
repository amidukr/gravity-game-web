import { Mesh, MeshBasicMaterial } from "three";
import { BaseTaggedObjectOnUpdateHandler } from "../../../../../../common/game/engine/3rd-party/threejs/scene-graph-controller/utils/BaseTaggedObjectOnUpdateHandler";
import { TaggedObject } from "../../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTagIndex";

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
