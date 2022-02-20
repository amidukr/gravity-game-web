import { GameLoaderExecutionOrder } from "../framework/GameLoaderTypes";
import { BaseGameLoader } from "./GameLoader";

export abstract class BaseGameState<O> extends BaseGameLoader {
  object!: O;

  override executionOrder(): number {
    return GameLoaderExecutionOrder.GameObjectConstructor;
  }

  abstract construtNewObject(): O | Promise<O>;

  async startNewGame(): Promise<void> {
    this.object = await this.construtNewObject();
  }
}
