import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { BaseGameStateModel } from "../../framework/GameModelTypes";
import { LoadGameObject } from "../loader/object/LoadGameObject";

export class GameTime {
  milliseconds: number = 0;
}

export class GameTimeModel extends BaseGameStateModel<GameTime> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(loadGameObject: LoadGameObject): GameTime {
    return new GameTime();
  }
}
