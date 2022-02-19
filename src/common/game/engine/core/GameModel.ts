import { BaseGameLoader } from "./GameLoader";

export abstract class BaseGameModel<O> extends BaseGameLoader {
  object!: O;

  abstract construtNewObject(): O | Promise<O>;

  async startNewGame(): Promise<void> {
    this.object = await this.construtNewObject();
  }
}
