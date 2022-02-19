import { BaseGameLooper } from "../core/GameLooper";

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

export abstract class BaseGameRenderingLooper extends BaseGameLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameRenderingLooper;
  }
}
