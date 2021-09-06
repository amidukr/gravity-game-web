import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameLoader, TYPE_GameLoader } from "../../../common/framework/game/loader/core/GameLoader";

import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { GravityGameModel, GravityGameModelObject, TYPE_GravityGameModel } from "../model/GravityGameModelObject";
import { LoadGameObject } from "../../../common/framework/game/loader/core/LoadGameObject";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";
import { Quaternion, Vector3 } from "three";
import { quanterionBaseVector } from "../../../common/framework/game/3rd-party/threejs/Constants";

export class GravityGameLoader implements GameLoader, ApplicationComponent {
  private gameModel!: GravityGameModel;
  private gameLevel!: GravityGameLevel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoader);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
    this.gameModel = application.getComponent(TYPE_GravityGameModel);
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
  }

  async loadGame(loadGameObject: LoadGameObject): Promise<void> {
    const modelObject = new GravityGameModelObject();
    this.gameModel.object = modelObject;

    const levelPlayerSpaceShip = this.gameLevel.object.data.spaceShips.player;

    modelObject.spaceShips.player.position.fromArray(levelPlayerSpaceShip.position);

    modelObject.view.quaternion = new Quaternion()
      .setFromUnitVectors(quanterionBaseVector(), new Vector3().fromArray(levelPlayerSpaceShip.velocity))
      .normalize();
  }
}
