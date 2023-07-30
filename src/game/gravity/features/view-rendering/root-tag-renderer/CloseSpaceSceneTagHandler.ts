import { Object3D } from "three";
import { SceneSubscribeContext } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/SceneSubscribeContext";
import { TaggedSceneController } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneController";
import { TaggedObject } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { getCloseSceneUssName, TAG_CloseSpaceScene } from "./RootTagHandler";

export class CloseSpaceSceneTagHandler extends TaggedSceneController {
  override subscribe(ctx: SceneSubscribeContext): void {
    ctx.registerOnAddEach([TAG_CloseSpaceScene], this.onCloseSpaceSceneCreate.bind(this));
    ctx.registerOnUpdateEach([TAG_CloseSpaceScene], this.onCloseSpaceSceneUpdate.bind(this));
  }

  onCloseSpaceSceneCreate(o: TaggedObject<Object3D>) {
    const ussName = getCloseSceneUssName(o.object);

    // copy planet
    // hide planet
  }

  onCloseSpaceSceneUpdate(o: TaggedObject<Object3D>) {
    const ussName = getCloseSceneUssName(o.object);

    // update coordinates
  }

  onCloseSpaceSceneDelete(o: Object3D) {
    // TODO: show all planets
  }
}
