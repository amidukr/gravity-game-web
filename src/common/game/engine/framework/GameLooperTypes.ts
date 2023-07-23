import { TypeIdentifier, typeIdentifier } from "../../../app/lookup/TypeIdentifier";
import { LifecycleStage } from "../../../app/utils/LifecycleStage";
import { PACKAGE_AmidGeFramework } from "../../../package";
import { BaseGameLooper, GameLooper } from "../core/GameLooper";

export const TYPE_GameModelLooper = typeIdentifier<GameLooper>("GameProcessingLooper", PACKAGE_AmidGeFramework);
export const TYPE_GameViewLooper = typeIdentifier<GameLooper>("GameViewLooper", PACKAGE_AmidGeFramework);

export abstract class GameLooperExecutionOrder {
  static GameLooperRootStage = LifecycleStage.root();

  static GameInputLooper = LifecycleStage.runAfter(this.GameLooperRootStage);
  static GameCoreLooper = LifecycleStage.runAfter(this.GameInputLooper);
  static GameModelProcessingLooper = LifecycleStage.runAfter(this.GameCoreLooper);
  static GamePreRenderingLooper = LifecycleStage.runAfter(this.GameModelProcessingLooper);
  static GameSceneTaggingLooper = LifecycleStage.runAfter(this.GamePreRenderingLooper);
  static GameRenderingLooper = LifecycleStage.runAfter(this.GameSceneTaggingLooper);
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

export abstract class BaseGameSceneTaggingLooper extends BaseGameViewLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameSceneTaggingLooper;
  }
}

export abstract class BaseGameRenderingLooper extends BaseGameViewLooper {
  executionOrder() {
    return GameLooperExecutionOrder.GameRenderingLooper;
  }
}
