import { Object3D } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { threeJsCleanTags } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsSceneTaggingModel";
import { SceneSubscribeContext } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/SceneSubscribeContext";
import { TaggedObjectEvent } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedObjectEvent";
import { TaggedSceneController } from "../../../../../common/game/engine/features/rendering/scene-graph-controller/TaggedSceneController";
import { sceneObjectTag, TaggedObject } from "../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { getGravityFieldPlanet, loadOriginalObjectTemplate } from "../../model-calculation/gravity-scene-model/UnvirseSceneModel";
import { SpaceShipsModel } from "../../model-calculation/space-ships/SpaceShipsModel";
import { getCloseSceneUssName, TAG_CloseSpaceScene } from "./RootTagHandler";

export class CloseSpaceSceneTagHandler extends TaggedSceneController {
  spaceShipModel!: SpaceShipsModel;
  closeScenToGravityField = new WeakMap<Object3D, WeakRef<Object3D>>();

  autowire(application: ApplicationContainer): void {
    this.spaceShipModel = application.getComponent(SpaceShipsModel);
  }

  override subscribe(ctx: SceneSubscribeContext): void {
    ctx.registerOnAddEach([TAG_CloseSpaceScene], this.onCloseSpaceSceneCreate.bind(this));
    ctx.registerOnUpdateEach([TAG_CloseSpaceScene], this.onCloseSpaceSceneUpdate.bind(this));
    ctx.registerOnDeleteEach([TAG_CloseSpaceScene], this.onCloseSpaceSceneDelete.bind(this));
  }

  lookupCoordinate(closeSceneObject: Object3D) {
    const ussName = getCloseSceneUssName(closeSceneObject);

    return this.spaceShipModel.object.player.coordinateSet[ussName];
  }

  lookupGravityField(closeSceneObject: Object3D, event: TaggedObjectEvent<Object3D>): Object3D | undefined {
    const coordinate = this.lookupCoordinate(closeSceneObject);

    const gravityObjectName: string = coordinate.location.attributes.gravityObjectName;

    return event.sceneTagModel.getFirstObjectByTag(sceneObjectTag<Object3D>(gravityObjectName))?.object;
  }

  onCloseSpaceSceneCreate(o: TaggedObject<Object3D>, event: TaggedObjectEvent<Object3D>) {
    const closeSpaceRoot = o.object;
    const gravityField = this.lookupGravityField(o.object, event);

    if (!gravityField) return;

    const planet = gravityField ? getGravityFieldPlanet(gravityField) : undefined;

    if (!planet) return;

    this.closeScenToGravityField.set(closeSpaceRoot, new WeakRef(gravityField));
    gravityField.visible = false;

    const gravityFieldClone = loadOriginalObjectTemplate(gravityField);
    threeJsCleanTags(gravityFieldClone);
    gravityFieldClone.position.set(0, 0, 0);
    closeSpaceRoot.add(gravityFieldClone);

    console.info();
  }

  onCloseSpaceSceneUpdate(o: TaggedObject<Object3D>) {
    const object = o.object;
    const coordiante = this.lookupCoordinate(object);

    object.position.copy(coordiante.position);
    object.position.negate();
  }

  onCloseSpaceSceneDelete(o: TaggedObject<Object3D>, event: TaggedObjectEvent<Object3D>) {
    const gravityField = this.closeScenToGravityField.get(o.object)?.deref();
    if (gravityField) {
      gravityField.visible = true;
    }
  }
}
