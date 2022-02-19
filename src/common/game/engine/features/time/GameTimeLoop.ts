import { ApplicationAutowireComponent, TYPE_ApplicationComponent } from "../../../../app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { Introspection } from "../../../../app/lookup/Introspection";
import { GameLooper, TYPE_GameLoop } from "../../core/GameLooper";
import { GameEvent } from "../../GameEvent";
import { GameTimeModel } from "./GameTimeModel";

export class GameTimeLoop implements GameLooper, ApplicationAutowireComponent {
  gameTimeModel!: GameTimeModel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
    Introspection.bindInterfaceName(this, TYPE_GameLoop);
  }

  autowire(application: ApplicationContainer): void {
    this.gameTimeModel = application.getComponent(GameTimeModel);
  }

  execute(event: GameEvent): void {
    this.gameTimeModel.object.milliseconds += event.elapsedTimeMills;
  }
}
