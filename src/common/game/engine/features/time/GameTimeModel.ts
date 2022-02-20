import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { BaseGameCoreState } from "../../framework/GameModelTypes";

export class GameTime {
  milliseconds: number = 0;
}

export class GameTimeModel extends BaseGameCoreState<GameTime> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(): GameTime {
    return new GameTime();
  }
}
