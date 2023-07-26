import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { TAG_GameLevelRoot } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsRootSceneLoader";
import { threeJsAddTag, threeJsSetTagName } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { TaggedObjectHandler } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/utils/TaggedObjectHandler";
import { sceneObjectTag } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { SpaceShipsModel } from "../../model-calculation/space-ships/SpaceShipsModel";
import { TAG_DancingColor } from "../close-space-renderer/controllers/ColorfulTaggedController";

export const TAG_UniverseRoot = sceneObjectTag<Object3D>("TAG:UniverseRoot");

export class RootTagHandler extends TaggedObjectHandler {
  spaceShipsModel!: SpaceShipsModel;

  autowire(application: ApplicationContainer): void {
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  override subscribe(): void {
    this.registerOnCreateEach([TAG_GameLevelRoot], this.onGameLevelRootCreate.bind(this));
    //this.registerOnCreateEach([TAG_Root], this.onSceneRootCreate.bind(this));
    this.registerOnUpdateEach([TAG_UniverseRoot], this.onUniverseRootUpdate.bind(this));
  }

  onGameLevelRootCreate(o: Object3D) {
    threeJsAddTag(o, TAG_UniverseRoot);
  }

  onSceneRootCreate(o: Object3D) {
    const s = 69600000;
    const geometry = new BoxGeometry(s, s, s);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    threeJsSetTagName(cube, TAG_DancingColor, "universe");

    o.add(cube);
  }

  onUniverseRootUpdate(o: Object3D) {
    const playerShip = this.spaceShipsModel.object.player;

    //o.position.copy(playerShip.globalCoordinate);
    //o.position.negate();
  }
}
