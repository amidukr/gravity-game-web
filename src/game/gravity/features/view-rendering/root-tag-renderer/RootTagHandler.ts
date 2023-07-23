import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from "three";
import { BaseTaggedObjectOnCreateHandler } from "../../../../../common/game/engine/3rd-party/threejs/scene-graph-controller/utils/BaseTaggedObjectOnCreateHandler";
import { TAG_Root } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { threeJsSetTagName } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { TaggedObject } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { TAG_DancingColor } from "../close-space-renderer/controllers/ColorfulTaggedController";

export class RootTagHandler extends BaseTaggedObjectOnCreateHandler<Scene> {
  override tagSelector() {
    return [TAG_Root];
  }
  override onCreateObject(object: TaggedObject<Scene>): void {
    const s = 69600000;
    const geometry = new BoxGeometry(s, s, s);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    threeJsSetTagName(cube, TAG_DancingColor, "universe");

    object.object.add(cube);
  }
}
