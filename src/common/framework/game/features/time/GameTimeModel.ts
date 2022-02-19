import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { BaseGameModel } from "../../model/GameModel";
import { LoadGameObject } from "../loader/object/LoadGameObject";

export class GameTime {
  milliseconds: number = 0;
}

export class GameTimeModel extends BaseGameModel<GameTime> {
  autowire(application: ApplicationContainer): void {}

  construtNewObject(loadGameObject: LoadGameObject): GameTime {
    return new GameTime();
  }
}
