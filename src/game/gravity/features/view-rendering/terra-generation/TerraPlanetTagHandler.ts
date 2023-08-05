import { Mesh, Object3D } from "three";
import { threeJsAddTag } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { SceneSubscribeContext } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/SceneSubscribeContext";
import { TaggedSceneController } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneController";
import { TaggedObject } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { TAG_Planet } from "../../game-level/GravityGameTags";
import { TAG_GridShader } from "../common/GridShaderTagController";

export class TerraPlanetTagController extends TaggedSceneController {
  override subscribe(ctx: SceneSubscribeContext): void {
    ctx.registerOnAddEach([TAG_Planet], this.onNewPlanet.bind(this));
    ctx.registerOnUpdateEach([TAG_Planet], this.onPlanetTerraUpdate.bind(this));
  }

  onNewPlanet(o: TaggedObject<Object3D>) {
    const planet = o.object.parent as Mesh;
    console.info("Generating terra for", planet);

    threeJsAddTag(planet, TAG_GridShader);

    //planet.material = new GridShaderMaterial();
  }

  onPlanetTerraUpdate(o: TaggedObject<Object3D>) {
    // const planet = o.object.parent as Mesh;
    // const terraShaderMaterial = planet.material as GridShaderMaterial;
    // terraShaderMaterial.objectCenter = planet.getWorldPosition(new Vector3());
  }
}
