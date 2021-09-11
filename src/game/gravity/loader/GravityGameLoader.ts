import { Quaternion, Vector3 } from "three";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameLoaderModule, TYPE_GameLoaderModule } from "../../../common/framework/game/loader/GameLoaderModule";
import { LoadGameObject } from "../../../common/framework/game/loader/object/LoadGameObject";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";
import { GravitySceneModel } from "../model/GravitySceneModel";
import { PlayerViewModel } from "../model/PlayerControlModel";
import { SpaceShipsModel } from "../model/SpaceShipsModel";

declare global {
  interface Window {
    [name: string]: any;
  }
}

export class GravityGameLoader implements GameLoaderModule, ApplicationComponent {
  spaceShipsModel!: SpaceShipsModel;
  playerViewModel!: PlayerViewModel;
  gameLevel!: GravityGameLevel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoaderModule);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: ApplicationContainer) {
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
    this.playerViewModel = application.getComponent(PlayerViewModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);

    window.sceneModel = application.getComponent(GravitySceneModel);
    window.playerViewModel = this.playerViewModel;
    window.spaceShipsModel = this.spaceShipsModel;
    window.gameLevel = this.gameLevel;
  }

  async startNewGame(loadGameObject: LoadGameObject): Promise<void> {
    const startPosition = this.gameLevel.object.rootScene.getObjectByName("Start-Position");

    if (startPosition == null) {
      throw Error("Can't find Start-Position object in scene");
    }

    this.spaceShipsModel.object.player.throttle = this.gameLevel.object.data.spaceShips.player.throttle || 0.1;
    this.spaceShipsModel.object.player.position = startPosition.getWorldPosition(new Vector3());

    this.playerViewModel.object.viewQuaternion = startPosition
      .getWorldQuaternion(new Quaternion())
      .multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2));
  }
}
