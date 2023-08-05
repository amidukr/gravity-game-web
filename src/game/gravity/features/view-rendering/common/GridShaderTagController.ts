import { Mesh, Vector3 } from "three";
import { SceneSubscribeContext } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/SceneSubscribeContext";
import { TaggedSceneController } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneController";
import { sceneObjectTag, TaggedObject } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { GridShaderMaterial } from "../../../../../common/materials/GridShaderMaterial";

export const TAG_GridShader = sceneObjectTag<Mesh>("Tag:GridShader");

export class GridShaderTagController extends TaggedSceneController {
  override subscribe(ctx: SceneSubscribeContext): void {
    ctx.registerOnAddEach([TAG_GridShader], this.onGridTagAdd.bind(this));
    ctx.registerOnUpdateEach([TAG_GridShader], this.onGridTagUpdate.bind(this));
  }

  onGridTagAdd(o: TaggedObject<Mesh>): void {
    o.object.material = new GridShaderMaterial();
  }

  onGridTagUpdate(o: TaggedObject<Mesh>): void {
    const object = o.object;

    const material = object.material as GridShaderMaterial;

    material.objectCenter = object.getWorldPosition(new Vector3());
  }
}
