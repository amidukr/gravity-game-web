import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { TAG_Root } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { TAG_GameLevelRoot } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsRootSceneLoader";
import { threeJsAddTag, threeJsSetTagName } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { TaggedObjectEvent } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/handlers/TaggedObjectEvent";
import { SubscribeContext, TaggedObjectHandler } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/utils/TaggedObjectHandler";
import { sceneObjectTag } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { GravityConfiguration } from "../../../configuration/GravityConfiguration";
import { USSL_UNIVERSE } from "../../model-calculation/gravity-sublocation/GravityUsslContainerHandler";
import { SpaceShipsModel } from "../../model-calculation/space-ships/SpaceShipsModel";
import { TAG_DancingColor } from "../close-space-renderer/controllers/ColorfulTaggedController";

export const TAG_UniverseRoot = sceneObjectTag<Object3D>("TAG:UniverseRoot");
export const TAG_CloseSpaceScene = sceneObjectTag<Object3D>("TAG:CloseSpaceScene");

export function getCloseSceneUssName(o: Object3D): String {
  return o.userData.ussName;
}

export function setCloseSceneUssName(o: Object3D, ussName: String) {
  o.userData.ussName = ussName;
}

export class RootTagHandler extends TaggedObjectHandler {
  spaceShipsModel!: SpaceShipsModel;

  autowire(application: ApplicationContainer): void {
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  override subscribe(ctx: SubscribeContext): void {
    ctx.registerOnCreateEach([TAG_GameLevelRoot], this.onGameLevelRootCreate.bind(this));
    ctx.registerOnCreateEach([TAG_Root], this.onSceneRootCreate.bind(this));
    ctx.registerOnUpdateEach([TAG_UniverseRoot], this.onUniverseRootUpdate.bind(this));
    ctx.registerOnUpdateEach([TAG_Root], this.onRootUpdate.bind(this));
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

  onRootUpdate(o: Object3D, e: TaggedObjectEvent<Object3D>) {
    const localCoordinate = this.spaceShipsModel.object.player.ussPosition;

    const ussType = localCoordinate.location.type;
    const ussName = localCoordinate.location.name;

    const closeSpaceScene = e.sceneTagModel.getFirstObjectByTag(TAG_CloseSpaceScene)?.object;

    const prevUssName = closeSpaceScene ? getCloseSceneUssName(closeSpaceScene) : undefined;

    if (ussType == USSL_UNIVERSE || prevUssName != ussName) {
      if (closeSpaceScene != undefined) {
        // TODO: show all planets

        o.remove(closeSpaceScene);
      }
    }

    if (ussType == USSL_UNIVERSE) return;

    if (prevUssName != ussName) {
      const newCloseSpaceScene = new Object3D();
      threeJsSetTagName(newCloseSpaceScene, TAG_CloseSpaceScene);
      setCloseSceneUssName(newCloseSpaceScene, ussName);
      o.add(newCloseSpaceScene);
    }
  }

  onUniverseRootUpdate(o: Object3D) {
    const playerShip = this.spaceShipsModel.object.player;

    if (GravityConfiguration.worldRelativeToCamera) {
      o.position.copy(playerShip.globalCoordinate);
      o.position.negate();
    } else {
      o.position.set(0, 0, 0);
    }
  }
}
