import { Introspection } from "../../../common/app/lookup/Introspection";
import {
  GameLoader,
  TYPE_GameLoader,
} from "../../../common/framework/game/loader/core/GameLoader";
import { GameModel } from "../../../common/framework/game/model/GameModel";

import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import {
  GravityGameModelObject,
  TYPE_GravityGameModel,
} from "../model/GravityGameModelObject";
import { LoadGameObject } from "../../../common/framework/game/loader/core/LoadGameObject";
import { GameLevel } from "../../../common/framework/game/level/GameLevel";
import {
  GravityGameLevelObject,
  TYPE_GravityGameLevel,
} from "../level/GravityGameLevelObject";
import { Quaternion, Vector3 } from "three";

export class GravityGameLoader implements GameLoader, ApplicationComponent {
  private gameModel!: GameModel<GravityGameModelObject>;
  private gameLevel!: GameLevel<GravityGameLevelObject>;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoader);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
    this.gameModel = application.getComponent(TYPE_GravityGameModel);
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
  }

  async loadGameModel(loadGameObject: LoadGameObject): Promise<void> {
    const modelObject = new GravityGameModelObject();
    this.gameModel.object = modelObject;

    const levelPlayerSpaceShip = this.gameLevel.object.data.spaceShips.player;

    modelObject.spaceShips.player.position.fromArray(levelPlayerSpaceShip.position)

    modelObject.viewQuaternion = new Quaternion().setFromUnitVectors(
      new Vector3(0, 0, -1),
      new Vector3().fromArray(levelPlayerSpaceShip.velocity)
    );
  }
}
