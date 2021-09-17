import { ApplicationAutowireComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEvent } from "../../../common/framework/game/GameEvent";
import { GameLoop, TYPE_GameLoop } from "../../../common/framework/game/looper/GameLoop";
import { GravitySceneModel } from "../model/GravitySceneModel";

export class ScaleSunSizeLoop implements GameLoop, ApplicationAutowireComponent {
  sceneModel!: GravitySceneModel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
    Introspection.bindInterfaceName(this, TYPE_GameLoop);
  }

  autowire(application: ApplicationContainer): void {
    this.sceneModel = application.getComponent(GravitySceneModel);
  }

  execute(event: GameEvent): void {
    //this.sceneModel.
  }
}
