import { BaseGameLoaderModule } from "../loader/BaseGameLoaderModule";
import { LoadGameObject } from "../loader/object/LoadGameObject";

export abstract class BaseGameModel<O> extends BaseGameLoaderModule {
  object!: O;

  abstract construtNewObject(loadGameObject: LoadGameObject): O | Promise<O>;

  async startNewGame(loadGameObject: LoadGameObject): Promise<void> {
    this.object = await this.construtNewObject(loadGameObject);
  }
}
