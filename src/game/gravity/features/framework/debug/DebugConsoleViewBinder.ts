import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseApplicationComponent } from "../../../../../common/app/utils/BaseApplicationComponent";
import { ThreeJsGameViewSceneModel } from "../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";

export class DebugConsoleViewBinder extends BaseApplicationComponent {
  autowire?(application: ApplicationContainer): void {
    window.game = window.game || {};

    window.game.viewSceneModel = application.getComponent(ThreeJsGameViewSceneModel);
  }
}
