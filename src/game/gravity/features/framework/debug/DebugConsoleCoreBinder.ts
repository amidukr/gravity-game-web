import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../common/app/utils/BaseApplicationComponent";
import { TYPE_GravityGameLevel } from "../../game-level/GravityGameLevelObject";
import { GravitySceneModel } from "../../model-calculation/gravity-universe/GravitySceneModel";
import { PlayerControlModel } from "../../model-calculation/player-control/PlayerControlModel";
import { SpaceShipsModel } from "../../model-calculation/space-ships/SpaceShipsModel";

export class DebugConsoleCoreBinder extends BaseApplicationComponent {
  autowire?(application: ApplicationContainer): void {
    window.game = window.game || {};

    window.game.application = application;
    window.game.sceneModel = application.getComponent(GravitySceneModel);
    window.game.playerViewModel = application.getComponent(PlayerControlModel);
    window.game.spaceShipsModel = application.getComponent(SpaceShipsModel);
    window.game.gameLevel = application.getComponent(TYPE_GravityGameLevel);
  }
}
