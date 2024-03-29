import { Vector3 } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BaseGameSceneUpdateLooper } from "../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../common/game/engine/GameEvent";
import { expSteepness, smootStep } from "../../../common/utils/math";
import { GravitySceneModel } from "../model/GravitySceneModel";
import { PlayerViewModel } from "../model/PlayerControlModel";

export class ScaleSunSizeLoop extends BaseGameSceneUpdateLooper {
  sceneModel!: GravitySceneModel;
  playerViewModel!: PlayerViewModel;

  private planetMinOrbit!: number;
  private planetMaxRadius!: number;

  override autowire(application: ApplicationContainer): void {
    this.sceneModel = application.getComponent(GravitySceneModel);
    this.playerViewModel = application.getComponent(PlayerViewModel);
  }

  override startNewGame() {
    const star = this.sceneModel.object.sceneDictionary.firstStar;
    this.planetMinOrbit = Number.MAX_VALUE;
    this.planetMaxRadius = 0;

    for (const obj of Object.values(this.sceneModel.object.sceneDictionary.planets)) {
      const distance = star.position.distanceTo(obj.position);
      this.planetMinOrbit = Math.min(distance, this.planetMinOrbit);
      this.planetMaxRadius = Math.max(this.planetMaxRadius, obj.radius);
    }
  }

  execute(event: GameEvent): void {
    const star = this.sceneModel.object.sceneDictionary.firstStar;
    const camera = this.playerViewModel.object.camera;

    const distanceToStar = star.position.distanceTo(camera.position);

    const freeOrbit = this.planetMinOrbit - this.planetMaxRadius;

    const distanceToStarFactor = smootStep(expSteepness(1.0 - distanceToStar / freeOrbit, 1), 0.0, 0.7);

    const projectionScale = new Vector3().copy(star.position).project(camera).add(new Vector3(0, 0.125, 0)).unproject(camera).sub(star.position);

    star.object.scale.setScalar(
      Math.min(projectionScale.length(), 0.5 * (this.planetMinOrbit - this.planetMaxRadius)) + 0.05 * freeOrbit * distanceToStarFactor
    );
  }
}
