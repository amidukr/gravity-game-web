import { Introspection } from "../../../app/lookup/Introspection";
import { GameStarter, TYPE_GameStarter } from "../core/GameLoader";
import { BaseGameLooper } from "../core/GameLooper";
import { GameLoaderExecutionOrder } from "./GameLoaderTypes";

export enum GameLooperExecutionOrder {
  GameInputLooper = 100000,
  GameCoreLooper = 200000,
  GameModelProcessingLooper = 300000,
  GameSceneUpdateLooper = 400000,
  GameRenderingLooper = 500000,
}

export abstract class BaseGameInputLooper extends BaseGameLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameInputLooper;
  }
}

export abstract class BaseGameCoreLooper extends BaseGameLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameCoreLooper;
  }
}

export abstract class BaseGameModelProcessingLooper extends BaseGameLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameModelProcessingLooper;
  }
}

export abstract class BaseGameSceneUpdateLooper extends BaseGameLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameSceneUpdateLooper;
  }
}

export abstract class BaseGameRenderingLooper extends BaseGameLooper implements GameStarter {
  constructor() {
    super();

    Introspection.bindInterfaceName(this, TYPE_GameStarter, {
      executionOrder: GameLoaderExecutionOrder.GameLoopStarter,
    });
  }

  startNewGame(): void {}

  executionOrder() {
    return GameLooperExecutionOrder.GameRenderingLooper;
  }
}
