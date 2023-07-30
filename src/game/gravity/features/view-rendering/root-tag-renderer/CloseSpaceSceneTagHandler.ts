import { Object3D } from "three";
import { SubscribeContext, TaggedObjectHandler } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/utils/TaggedObjectHandler";
import { getCloseSceneUssName, TAG_CloseSpaceScene } from "./RootTagHandler";

export class CloseSpaceSceneTagHandler extends TaggedObjectHandler {
  override subscribe(ctx: SubscribeContext): void {
    ctx.registerOnCreateEach([TAG_CloseSpaceScene], this.onCloseSpaceSceneCreate.bind(this));
    ctx.registerOnUpdateEach([TAG_CloseSpaceScene], this.onCloseSpaceSceneUpdate.bind(this));
  }

  onCloseSpaceSceneCreate(o: Object3D) {
    const ussName = getCloseSceneUssName(o);

    // copy planet
    // hide planet
  }

  onCloseSpaceSceneUpdate(o: Object3D) {
    const ussName = getCloseSceneUssName(o);

    // update coordinates
  }
}
