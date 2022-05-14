import { BaseGameCoreState } from "../../framework/GameModelTypes";

export class GameTime {
  milliseconds: number = 0;
}

export class GameTimeModel extends BaseGameCoreState<GameTime> {
  construtNewObject(): GameTime {
    return new GameTime();
  }
}
