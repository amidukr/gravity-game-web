import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { TAG_Root } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { TAG_GameLevelRoot } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsRootSceneLoader";
import { threeJsAddTag, threeJsSetTagName } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { SceneSubscribeContext } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/SceneSubscribeContext";
import { TaggedObjectEvent } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedObjectEvent";
import { TaggedSceneController } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneController";
import { sceneObjectTag, TaggedObject } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { GravityConfiguration } from "../../../configuration/GravityConfiguration";
import { USSL_UNIVERSE } from "../../model-calculation/gravity-sublocation/GravityUsslContainerHandler";
import { SpaceShipsModel } from "../../model-calculation/space-ships/SpaceShipsModel";
import { TAG_DancingColor } from "../close-space-renderer/controllers/ColorfulTaggedController";

export const TAG_UniverseRoot = sceneObjectTag<Object3D>("Tag:UniverseRoot");
export const TAG_CloseSpaceScene = sceneObjectTag<Object3D>("Tag:CloseSpaceScene");

export function getCloseSceneUssName(o: Object3D): String {
  return o.userData.ussName;
}

export function setCloseSceneUssName(o: Object3D, ussName: String) {
  o.userData.ussName = ussName;
}

export class RootTagHandler extends TaggedSceneController {
  spaceShipsModel!: SpaceShipsModel;

  autowire(application: ApplicationContainer): void {
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
  }

  override subscribe(ctx: SceneSubscribeContext): void {
    ctx.registerOnAddEach([TAG_GameLevelRoot], this.onGameLevelRootCreate.bind(this));
    ctx.registerOnAddEach([TAG_Root], this.onSceneRootCreate.bind(this));
    ctx.registerOnUpdateEach([TAG_UniverseRoot], this.onUniverseRootUpdate.bind(this));
    ctx.registerOnUpdateEach([TAG_Root], this.onRootUpdate.bind(this));
  }

  onGameLevelRootCreate(o: TaggedObject<Object3D>) {
    console.info("onGameLevelRootCreate");
    threeJsAddTag(o.object, TAG_UniverseRoot);
  }

  onSceneRootCreate(o: TaggedObject<Object3D>) {
    const s = 69600000;
    const geometry = new BoxGeometry(s, s, s);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    threeJsSetTagName(cube, TAG_DancingColor, "universe");

    o.object.add(cube);
  }

  onRootUpdate(o: TaggedObject<Object3D>, e: TaggedObjectEvent<Object3D>) {
    const object = o.object;
    const localCoordinate = this.spaceShipsModel.object.player.ussPosition;

    const ussType = localCoordinate.location.type;
    const ussName = localCoordinate.location.name;

    const closeSpaceScene = e.sceneTagModel.getFirstObjectByTag(TAG_CloseSpaceScene)?.object;

    const prevUssName = closeSpaceScene ? getCloseSceneUssName(closeSpaceScene) : undefined;

    if (ussType == USSL_UNIVERSE || prevUssName != ussName) {
      if (closeSpaceScene != undefined) {
        object.remove(closeSpaceScene);
      }
    }

    if (ussType == USSL_UNIVERSE) return;

    if (prevUssName != ussName) {
      const newCloseSpaceScene = new Object3D();
      threeJsSetTagName(newCloseSpaceScene, TAG_CloseSpaceScene);
      setCloseSceneUssName(newCloseSpaceScene, ussName);
      object.add(newCloseSpaceScene);
    }
  }

  onUniverseRootUpdate(o: TaggedObject<Object3D>) {
    console.info("onUniverseRootUpdate");
    const object = o.object;
    const playerShip = this.spaceShipsModel.object.player;

    if (GravityConfiguration.worldRelativeToCamera) {
      object.position.copy(playerShip.globalCoordinate);
      object.position.negate();
    } else {
      object.position.set(0, 0, 0);
    }
  }
}
