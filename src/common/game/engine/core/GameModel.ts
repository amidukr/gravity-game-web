import { ApplicationContainer } from "../../../app/ApplicationContainer";
import { LifecycleStage } from "../../../app/utils/LifecycleStage";
import { GameLoaderExecutionOrder } from "../framework/GameLoaderTypes";
import { BaseGameLoader } from "./GameLoader";

export abstract class BaseGameState<O> extends BaseGameLoader {
  object!: O;

  override autowire(application: ApplicationContainer): void {}

  override executionOrder(): LifecycleStage {
    return GameLoaderExecutionOrder.GameObjectConstructor;
  }

  abstract construtNewObject(): O | Promise<O>;

  async startNewGame(): Promise<void> {
    this.object = await this.construtNewObject();
  }
}
