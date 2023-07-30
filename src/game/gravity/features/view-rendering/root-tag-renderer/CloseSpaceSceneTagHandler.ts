import { Object3D } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { SceneSubscribeContext } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/SceneSubscribeContext";
import { TaggedObjectEvent } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedObjectEvent";
import { TaggedSceneController } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneController";
import { sceneObjectTag, TaggedObject } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { SpaceShipsModel } from "../../model-calculation/space-ships/SpaceShipsModel";
import { getCloseSceneUssName, TAG_CloseSpaceScene } from "./RootTagHandler";

export class CloseSpaceSceneTagHandler extends TaggedSceneController {
  spaceShipModel!: SpaceShipsModel;

  autowire(application: ApplicationContainer): void {
    this.spaceShipModel = application.getComponent(SpaceShipsModel);
  }

  override subscribe(ctx: SceneSubscribeContext): void {
    ctx.registerOnAddEach([TAG_CloseSpaceScene], this.onCloseSpaceSceneCreate.bind(this));
    ctx.registerOnUpdateEach([TAG_CloseSpaceScene], this.onCloseSpaceSceneUpdate.bind(this));
    ctx.registerOnDeleteEach([TAG_CloseSpaceScene], this.onCloseSpaceSceneDelete.bind(this));
  }

  onCloseSpaceSceneCreate(o: TaggedObject<Object3D>, event: TaggedObjectEvent<Object3D>) {
    const ussName = getCloseSceneUssName(o.object);
    const tagModel = event.sceneTagModel;

    const coordinate = this.spaceShipModel.object.player.coordinateSet[ussName];

    console.info("onCloseSpaceSceneCreate", ussName, o.object, coordinate);
    const gravityObjectName: string = coordinate.location.attributes.gravityObjectName;

    console.info(coordinate.location.attributes.gravityObjectName);

    console.info(tagModel.getFirstObjectByTag(sceneObjectTag(gravityObjectName)));

    // copy planet
    // hide planet
  }

  onCloseSpaceSceneUpdate(o: TaggedObject<Object3D>) {
    const ussName = getCloseSceneUssName(o.object);

    // update coordinates
  }

  onCloseSpaceSceneDelete(o: TaggedObject<Object3D>) {
    const ussName = getCloseSceneUssName(o.object);
    // TODO: show all planets
  }
}
