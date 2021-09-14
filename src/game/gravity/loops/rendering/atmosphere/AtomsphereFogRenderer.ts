import { Fog, Vector3 } from "three";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { Introspection } from "../../../../../common/app/lookup/Introspection";
import { GameEvent } from "../../../../../common/framework/game/GameEvent";
import { GameLoop, TYPE_GameLooper } from "../../../../../common/framework/game/looper/GameLoop";
import { GravitySceneModel } from "../../../model/GravitySceneModel";
import { SpaceShipsModel } from "../../../model/SpaceShipsModel";

export class AtmosphereFogRenderer implements GameLoop, ApplicationComponent {
  sceneModel!: GravitySceneModel;
  spaceShipModel!: SpaceShipsModel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
    Introspection.bindInterfaceName(this, TYPE_GameLooper);
  }

  autowire(application: ApplicationContainer) {
    this.sceneModel = application.getComponent(GravitySceneModel);
    this.spaceShipModel = application.getComponent(SpaceShipsModel);
  }

  execute(event: GameEvent): void {
    if ("true" == "true") return;

    const position = this.spaceShipModel.object.player.position;

    this.sceneModel.object.scene.fog = null;

    for (const planet of Object.values(this.sceneModel.object.sceneDictionary.planets)) {
      const planetCenter = planet.object.getWorldPosition(new Vector3());
      const distanceToPlanet = planetCenter.sub(position).length();

      //TODO: externalized
      const atmospehereHeight = 300 * 1000;

      if (distanceToPlanet - planet.radius < atmospehereHeight) {
        this.sceneModel.object.scene.fog = new Fog(0xffffff, atmospehereHeight * 0.01, 6.0 * atmospehereHeight);

        return;
      }
    }
  }
}
