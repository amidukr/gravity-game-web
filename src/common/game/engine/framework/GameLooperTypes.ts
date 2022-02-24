import { TypeIdentifier, typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { PACKAGE_AmidGeFramework } from "../../../package";
import { BaseGameLooper, GameLooper } from "../core/GameLooper";

export const TYPE_GameModelLooper = typeIdentifier<GameLooper>("GameProcessingLooper", PACKAGE_AmidGeFramework);
export const TYPE_GameViewLooper = typeIdentifier<GameLooper>("GameViewLooper", PACKAGE_AmidGeFramework);

export enum GameLooperExecutionOrder {
  GameInputLooper = 100000,
  GameCoreLooper = 200000,
  GameModelProcessingLooper = 300000,
  GamePreRenderingLooper = 400000,
  GameRenderingLooper = 500000,
}

export abstract class BaseGameModelLooper extends BaseGameLooper {
  looperType(): TypeIdentifier<GameLooper> {
    return TYPE_GameModelLooper;
  }
}

export abstract class BaseGameViewLooper extends BaseGameLooper {
  looperType(): TypeIdentifier<GameLooper> {
    return TYPE_GameViewLooper;
  }
}

export abstract class BaseGameInputLooper extends BaseGameViewLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameInputLooper;
  }
}

export abstract class BaseGameCoreLooper extends BaseGameModelLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameCoreLooper;
  }
}

export abstract class BaseGameModelProcessingLooper extends BaseGameModelLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameModelProcessingLooper;
  }
}

export abstract class BaseGamePreRenderingLooper extends BaseGameViewLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GamePreRenderingLooper;
  }
}

export abstract class BaseGameRenderingLooper extends BaseGameViewLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameRenderingLooper;
  }
}
