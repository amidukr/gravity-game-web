import { BaseGameLooper } from "../core/GameLooper";

enum GameLooperExecutionOrder {
  GameInputLooper = 100000,
  GameModelProcessingLooper = 100000,
  GameSceneUpdaterLooper = 200000,
  GameRenderingLooper = 300000,
}

export abstract class BaseGameInputLooper extends BaseGameLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameInputLooper;
  }
}

export abstract class BaseGameModelProcessingLooper extends BaseGameLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameModelProcessingLooper;
  }
}

export abstract class BaseGameSceneUpdaterLooper extends BaseGameLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameSceneUpdaterLooper;
  }
}

export abstract class BaseGameRenderingLooper extends BaseGameLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameRenderingLooper;
  }
}
