import { Mesh, MeshBasicMaterial, Object3D } from "three";
import { SceneSubscribeContext } from "../../../../../../common/game/engine/features/rendering/scene-graph-controller/SceneSubscribeContext";
import { TaggedSceneController } from "../../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneController";
import { sceneObjectTag, TaggedObject } from "../../../../../../common/game/engine/features/rendering/SceneTaggingModel";

export const TAG_DancingColor = sceneObjectTag("Tag:DancingColor");

export class ColorfulTaggedController extends TaggedSceneController {
  override subscribe(ctx: SceneSubscribeContext): void {
    ctx.registerOnUpdateEach([TAG_DancingColor], this.onUpdateObject.bind(this));
  }

  onUpdateObject(object: TaggedObject<Object3D>): void {
    const material: MeshBasicMaterial = (object.object as Mesh).material as MeshBasicMaterial;
    material.color.r += Math.random() * 0.2 - 0.2 / 2;
    material.color.g += Math.random() * 0.2 - 0.2 / 2;
    material.color.b += Math.random() * 0.2 - 0.2 / 2;

    material.color.r = Math.min(Math.max(material.color.r, 0), 1);
    material.color.g = Math.min(Math.max(material.color.g, 0), 1);
    material.color.b = Math.min(Math.max(material.color.b, 0), 1);
  }
}
