import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { LoadGameObject } from "../loader/object/LoadGameObject";
import { BaseGameModel } from "../model/BaseGameModel";

export class GameTime {
  milliseconds: number = 0;
}

export class GameTimeModel extends BaseGameModel<GameTime> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(loadGameObject: LoadGameObject): GameTime {
    return new GameTime();
  }
}
