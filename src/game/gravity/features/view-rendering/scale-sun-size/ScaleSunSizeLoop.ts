import { Box3, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { GameSceneObjectMetaModel } from "../../../../../common/game/engine/features/rendering/GameSceneObjectMeta";
import { BaseGamePreRenderingLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";
import { filterNotNull } from "../../../../../common/utils/CollectionUtils";
import { expSteepness, smootStep } from "../../../../../common/utils/math";
import { PLANET_TAG, STAR_TAG } from "../../game-level/GravityGameTags";
import { PlayerControlModel } from "../../model-calculation/player-control/PlayerControlModel";

export class ScaleSunSizeLoop extends BaseGamePreRenderingLooper {
  playerViewModel!: PlayerControlModel;

  private planetMinOrbit!: number;
  private planetMaxRadius!: number;

  private viewSceneModel!: ThreeJsGameViewSceneModel;
  private sceneMetaModel!: GameSceneObjectMetaModel;

  override autowire(application: ApplicationContainer): void {
    this.sceneMetaModel = application.getComponent(GameSceneObjectMetaModel);
    this.playerViewModel = application.getComponent(PlayerControlModel);
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
  }

  override startNewGame() {
    const starList = filterNotNull(this.sceneMetaModel.getObjectsByTag(STAR_TAG).map((x) => x.parent));
    const planetList = filterNotNull(this.sceneMetaModel.getObjectsByTag(PLANET_TAG).map((x) => x.parent));

    starList.forEach((star) => {
      this.planetMinOrbit = Number.MAX_VALUE;
      this.planetMaxRadius = 0;

      const starPosition = star.getWorldPosition(new Vector3());

      for (const planet of planetList) {
        const boundingBox = new Box3().setFromObject(planet);
        const size = boundingBox.getSize(new Vector3());
        const radius = Math.max(size.x, size.y, size.z) * 0.5;

        const planetPosition = planet.getWorldPosition(new Vector3());

        const distance = starPosition.distanceTo(planetPosition);

        this.planetMinOrbit = Math.min(distance, this.planetMinOrbit);
        this.planetMaxRadius = Math.max(this.planetMaxRadius, radius);
      }
    });
  }

  execute(event: GameEvent): void {
    const starList = filterNotNull(this.sceneMetaModel.getObjectsByTag(STAR_TAG).map((x) => x.parent));

    const camera = this.viewSceneModel.object.camera;

    const cameraPosition = camera.getWorldPosition(new Vector3());

    starList.forEach((star) => {
      const starPosition = star.getWorldPosition(new Vector3());

      const distanceToStar = starPosition.distanceTo(cameraPosition);

      const freeOrbit = this.planetMinOrbit - this.planetMaxRadius;

      const distanceToStarFactor = smootStep(expSteepness(1.0 - distanceToStar / freeOrbit, 1), 0.0, 0.7);

      const projectionScale = new Vector3().copy(star.position).project(camera).add(new Vector3(0, 0.125, 0)).unproject(camera).sub(star.position);

      const starScalar = Math.min(projectionScale.length(), 0.5 * (this.planetMinOrbit - this.planetMaxRadius)) + 0.05 * freeOrbit * distanceToStarFactor;

      star.scale.setScalar(starScalar);
    });
  }
}
