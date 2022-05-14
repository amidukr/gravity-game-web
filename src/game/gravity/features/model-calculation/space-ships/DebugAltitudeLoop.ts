import { Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseGameModelProcessingLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";
import { DebugInfoModel } from "../../framework/debug/DebugInfoModel";
import { GravitySpaceObjectsService } from "../gravity-universe/service/GravitySpaceObjectsService";
import { SpaceShipsModel } from "./SpaceShipsModel";

export class DebugAltitudeLoop extends BaseGameModelProcessingLooper {
  debugModel!: DebugInfoModel;
  shipModel!: SpaceShipsModel;
  gravitySpaceObjects!: GravitySpaceObjectsService;

  autowire(application: ApplicationContainer): void {
    this.debugModel = application.getComponent(DebugInfoModel);
    this.gravitySpaceObjects = application.getComponent(GravitySpaceObjectsService);
    this.shipModel = application.getComponent(SpaceShipsModel);
  }

  execute(event: GameEvent): void {
    const shipPosition = this.shipModel.object.player.position;
    const planet = this.gravitySpaceObjects.findClosestPlanet(shipPosition);

    if (planet == null) {
      return;
    }

    const distanceToPlanetCenter = planet.getWorldPosition(new Vector3()).distanceTo(shipPosition);

    this.debugModel.object.altitude = distanceToPlanetCenter - planet.userData.radius;
  }
}
