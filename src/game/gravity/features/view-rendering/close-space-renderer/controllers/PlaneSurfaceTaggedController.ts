import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";
import { threeJsSetTagName } from "../../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { SceneSubscribeContext } from "../../../../../../common/game/engine/features/rendering/scene-graph-controller/SceneSubscribeContext";
import { TaggedSceneController } from "../../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneController";
import { sceneObjectTag, TaggedObject } from "../../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { TAG_DancingColor } from "./ColorfulTaggedController";

export const TAG_PLANET_SURFACE = sceneObjectTag("Tag:PlanetSurface");

export class PlaneSurfaceTaggedController extends TaggedSceneController {
  override subscribe(ctx: SceneSubscribeContext): void {
    ctx.registerOnAddEach([TAG_PLANET_SURFACE], this.onTagAddObject.bind(this));
  }

  onTagAddObject(object: TaggedObject<Object3D>): void {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    threeJsSetTagName(cube, TAG_DancingColor, "close");

    object.object.add(cube);
  }
}
