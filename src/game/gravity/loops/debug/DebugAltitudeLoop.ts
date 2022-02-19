import { ApplicationContainer } from "../../../../common/app/ApplicationContainer";
import { BaseGameModelProcessingLooper } from "../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../common/game/engine/GameEvent";
import { DebugInfoModel } from "../../model/DebugInfoModel";
import { GravitySceneModel } from "../../model/GravitySceneModel";
import { SpaceShipsModel } from "../../model/SpaceShipsModel";

export class DebugAltitudeLoop extends BaseGameModelProcessingLooper {
  debugModel!: DebugInfoModel;
  sceneModel!: GravitySceneModel;
  shipModel!: SpaceShipsModel;

  autowire(application: ApplicationContainer): void {
    this.debugModel = application.getComponent(DebugInfoModel);
    this.sceneModel = application.getComponent(GravitySceneModel);
    this.shipModel = application.getComponent(SpaceShipsModel);
  }

  execute(event: GameEvent): void {
    const shipPosition = this.shipModel.object.player.position;
    const planet = this.sceneModel.findClosestPlanet(shipPosition);

    if (planet == null) {
      return;
    }

    const distanceToPlanetCenter = planet.position.distanceTo(shipPosition);

    this.debugModel.object.altitude = distanceToPlanetCenter - planet.radius;
  }
}
