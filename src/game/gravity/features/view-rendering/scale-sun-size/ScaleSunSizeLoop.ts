import { Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { BaseGamePreRenderingLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";
import { expSteepness, smootStep } from "../../../../../common/utils/math";
import { GravitySpaceObjectsService } from "../../model-calculation/gravity-universe/service/GravitySpaceObjectsService";
import { PlayerControlModel } from "../../model-calculation/player-control/PlayerControlModel";

export class ScaleSunSizeLoop extends BaseGamePreRenderingLooper {
  playerViewModel!: PlayerControlModel;

  private planetMinOrbit!: number;
  private planetMaxRadius!: number;

  private viewSceneModel!: ThreeJsGameViewSceneModel;
  private gravitySpaceObjects!: GravitySpaceObjectsService;

  override autowire(application: ApplicationContainer): void {
    this.gravitySpaceObjects = application.getComponent(GravitySpaceObjectsService);
    this.playerViewModel = application.getComponent(PlayerControlModel);
    this.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
  }

  override startNewGame() {
    const starList = this.gravitySpaceObjects.findStars();
    const planetList = this.gravitySpaceObjects.findPlantes();

    starList.forEach((star) => {
      this.planetMinOrbit = Number.MAX_VALUE;
      this.planetMaxRadius = 0;

      const starPosition = star.getWorldPosition(new Vector3());

      for (const planet of planetList) {
        const planetPosition = planet.getWorldPosition(new Vector3());

        const distance = starPosition.distanceTo(planetPosition);

        this.planetMinOrbit = Math.min(distance, this.planetMinOrbit);
        this.planetMaxRadius = Math.max(this.planetMaxRadius, planet.userData.radius);
      }
    });
  }

  execute(event: GameEvent): void {
    const starList = this.gravitySpaceObjects.findStars();

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
