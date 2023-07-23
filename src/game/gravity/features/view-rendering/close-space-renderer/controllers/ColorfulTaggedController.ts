import { Mesh, MeshBasicMaterial, Object3D } from "three";
import { BaseTaggedObjectOnUpdateHandler } from "../../../../../../common/game/engine/3rd-party/threejs/scene-graph-controller/utils/BaseTaggedObjectOnUpdateHandler";
import { sceneObjectTag, TaggedObject } from "../../../../../../common/game/engine/features/rendering/SceneTaggingModel";

export const TAG_DancingColor = sceneObjectTag("Tag:DancingColor");

export class ColorfulTaggedController extends BaseTaggedObjectOnUpdateHandler<Object3D> {
  tagSelector() {
    return [TAG_DancingColor];
  }

  onUpdateObject(object: TaggedObject<Object3D>): void {
    const material: MeshBasicMaterial = (object.object as Mesh).material as MeshBasicMaterial;
    material.color.r += Math.random() * 0.2 - 0.2 / 2;
    material.color.g += Math.random() * 0.2 - 0.2 / 2;
    material.color.b += Math.random() * 0.2 - 0.2 / 2;

    material.color.r = Math.min(Math.max(material.color.r, 0), 1);
    material.color.g = Math.min(Math.max(material.color.g, 0), 1);
    material.color.b = Math.min(Math.max(material.color.b, 0), 1);

    console.info("Dancing color:", object.name);
  }
}
