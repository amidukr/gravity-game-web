import { BaseGameLoaderModule } from "../features/loader/BaseGameLoaderModule";
import { LoadGameObject } from "../features/loader/object/LoadGameObject";

export abstract class BaseGameModel<O> extends BaseGameLoaderModule {
  object!: O;

  abstract construtNewObject(loadGameObject: LoadGameObject): O | Promise<O>;

  async startNewGame(loadGameObject: LoadGameObject): Promise<void> {
    this.object = await this.construtNewObject(loadGameObject);
  }
}

export abstract class BaseGameLevelModel<O> extends BaseGameModel<O> {}
export abstract class BaseGameStateModel<O> extends BaseGameModel<O> {}
export abstract class BaseGameViewModel<O> extends BaseGameModel<O> {}
