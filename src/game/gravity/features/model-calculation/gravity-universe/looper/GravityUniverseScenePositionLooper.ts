import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { SceneTaggingModel, TYPE_GameSceneTaggingModel } from "../../../../../../common/game/engine/features/rendering/SceneTaggingModel";
import { BaseGamePreRenderingLooper } from "../../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../../common/game/engine/GameEvent";
import { TAG_GravityField } from "../../../game-level/GravityGameTags";
import { GravityUniverseModel } from "../model/GravityUniverseModel";
import { GravityUniverseService } from "../service/GravityUniverseService";

export class GravityUniversePositionLooper extends BaseGamePreRenderingLooper {
  scenObjectMetaModel!: SceneTaggingModel;
  gravityUniverseService!: GravityUniverseService;
  gravityUniverseModel!: GravityUniverseModel;

  autowire(application: ApplicationContainer): void {
    this.scenObjectMetaModel = application.getComponent(TYPE_GameSceneTaggingModel);
    this.gravityUniverseService = application.getComponent(GravityUniverseService);
    this.gravityUniverseModel = application.getComponent(GravityUniverseModel);
  }

  execute(event: GameEvent): void {
    const gravityUniverseObjects = this.scenObjectMetaModel.getObjectsByTag(TAG_GravityField);

    this.gravityUniverseService.recalculateUniverse();

    gravityUniverseObjects.forEach((x) => {
      const gravityObject = this.gravityUniverseModel.getGravityObject(x.object.name);

      x.object.position.copy(gravityObject.currentPosition);
    });
  }
}
