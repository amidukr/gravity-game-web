import { Object3D } from "three";
import { SceneSubscribeContext } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/SceneSubscribeContext";
import { TaggedSceneController } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneController";
import { TaggedObject } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { TAG_Planet } from "../../game-level/GravityGameTags";

export class TerraPlanetTagHandler extends TaggedSceneController {
  override subscribe(ctx: SceneSubscribeContext): void {
    ctx.registerOnAddEach([TAG_Planet], this.onNewPlanet.bind(this));
  }

  onNewPlanet(o: TaggedObject<Object3D>) {
    console.info("Planet created", o);
  }
}
