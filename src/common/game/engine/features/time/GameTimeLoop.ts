import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { BaseGameCoreLooper } from "../../framework/GameLooperTypes";
import { GameEvent } from "../../GameEvent";
import { GameTimeModel } from "./GameTimeModel";

export class GameTimeLoop extends BaseGameCoreLooper {
  gameTimeModel!: GameTimeModel;

  autowire(application: ApplicationContainer): void {
    this.gameTimeModel = application.getComponent(GameTimeModel);
  }

  execute(event: GameEvent): void {
    this.gameTimeModel.object.milliseconds += event.elapsedTimeMills;
  }
}
