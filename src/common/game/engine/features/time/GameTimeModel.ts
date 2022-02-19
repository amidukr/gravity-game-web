import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { BaseGameCoreModel } from "../../framework/GameModelTypes";

export class GameTime {
  milliseconds: number = 0;
}

export class GameTimeModel extends BaseGameCoreModel<GameTime> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(): GameTime {
    return new GameTime();
  }
}
