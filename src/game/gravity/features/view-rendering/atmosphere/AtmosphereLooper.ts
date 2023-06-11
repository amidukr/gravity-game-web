import { Object3D, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { GameSceneObjectMetaModel, gameSceneObjectTag } from "../../../../../common/game/engine/features/rendering/GameSceneObjectMeta";
import { BaseGamePreRenderingLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";
import { ATMOSPHERE_TAG } from "../../game-level/GravityGameTags";
import { AtmospherShaderMaterial } from "./material/AtmospherMaterial";

export class AtmosphereLooper extends BaseGamePreRenderingLooper {
  sceneMetaModel!: GameSceneObjectMetaModel;

  autowire(application: ApplicationContainer): void {
    this.sceneMetaModel = application.getComponent(GameSceneObjectMetaModel);
  }
  execute(event: GameEvent): void {
    this.sceneMetaModel.getObjectsByTag(ATMOSPHERE_TAG).forEach((atmosphereObject) => {
      const planet = this.sceneMetaModel.getFirstObjectByTag(gameSceneObjectTag<Object3D>(atmosphereObject.userData.planeName));

      const backMaterial = atmosphereObject.material as AtmospherShaderMaterial;

      backMaterial.planetCenter = planet.getWorldPosition(new Vector3());
    });
  }
}