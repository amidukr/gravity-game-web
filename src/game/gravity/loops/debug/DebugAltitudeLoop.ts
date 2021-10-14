import {
  ApplicationAutowireComponent,
  TYPE_ApplicationComponent,
} from "../../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../common/app/ApplicationContainer";
import { Introspection } from "../../../../common/app/lookup/Introspection";
import { GameEvent } from "../../../../common/framework/game/GameEvent";
import { GameLoop, TYPE_GameLoop } from "../../../../common/framework/game/looper/GameLoop";
import { DebugInfoModel } from "../../model/DebugInfoModel";
import { GravitySceneModel } from "../../model/GravitySceneModel";
import { SpaceShipsModel } from "../../model/SpaceShipsModel";

export class DebugAltitudeLoop implements GameLoop, ApplicationAutowireComponent {
  debugModel!: DebugInfoModel;
  sceneModel!: GravitySceneModel;
  shipModel!: SpaceShipsModel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoop);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

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
