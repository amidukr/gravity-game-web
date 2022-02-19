import { Vector3 } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEvent } from "../../../common/framework/game/GameEvent";
import { BaseGameLoop, TYPE_GameLoop } from "../../../common/framework/game/looper/GameLoop";
import { GameLoopStarter, TYPE_GameLoopStarter } from "../../../common/framework/game/looper/GameLoopStarter";
import { expSteepness, smootStep } from "../../../common/utils/math";
import { GravitySceneModel } from "../model/GravitySceneModel";
import { PlayerViewModel } from "../model/PlayerControlModel";

export class ScaleSunSizeLoop extends BaseGameLoop implements GameLoopStarter {
  sceneModel!: GravitySceneModel;
  playerViewModel!: PlayerViewModel;

  private planetMinOrbit!: number;
  private planetMaxRadius!: number;

  constructor() {
    super(TYPE_GameLoop);
    Introspection.bindInterfaceName(this, TYPE_GameLoopStarter);
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
