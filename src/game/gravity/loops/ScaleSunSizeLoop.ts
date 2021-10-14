import { Vector3 } from "three";
import { ApplicationAutowireComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEvent } from "../../../common/framework/game/GameEvent";
import { GameLoop, TYPE_GameLoop } from "../../../common/framework/game/looper/GameLoop";
import { expSteepness, smootStep } from "../../../common/utils/math";
import { GravitySceneModel } from "../model/GravitySceneModel";
import { PlayerViewModel } from "../model/PlayerControlModel";

export class ScaleSunSizeLoop implements GameLoop, ApplicationAutowireComponent {
  sceneModel!: GravitySceneModel;
  playerViewModel!: PlayerViewModel;

  private planetMinOrbit!: number;
  private planetMaxRadius!: number;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
    Introspection.bindInterfaceName(this, TYPE_GameLoop);
  }

  autowire(application: ApplicationContainer): void {
    this.sceneModel = application.getComponent(GravitySceneModel);
    this.playerViewModel = application.getComponent(PlayerViewModel);
  }

  startNewGame() {
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

    const projectionScale = new Vector3()
      .copy(star.position)
      .project(camera)
      .add(new Vector3(0, 0.125, 0))
      .unproject(camera)
      .sub(star.position);

    star.object.scale.setScalar(
      Math.min(projectionScale.length(), 0.5 * (this.planetMinOrbit - this.planetMaxRadius)) +
        0.05 * freeOrbit * distanceToStarFactor
    );
  }
}