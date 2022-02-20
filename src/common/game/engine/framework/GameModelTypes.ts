import { BaseGameModel } from "../core/GameModel";
import { GameLoaderExecutionOrder } from "./GameLoaderTypes";

export abstract class BaseGameLevelModel<O> extends BaseGameModel<O> {
  executionOrder() {
    return GameLoaderExecutionOrder.GameLevelModelLoader;
  }
}

export abstract class BaseGameCoreModel<O> extends BaseGameModel<O> {
  executionOrder() {
    return GameLoaderExecutionOrder.GameCoreModelLoader;
  }
}

export abstract class BaseGameStateModel<O> extends BaseGameModel<O> {
  executionOrder() {
    return GameLoaderExecutionOrder.GameStateModelLoader;
  }
}

export abstract class BaseGameSceneModel<O> extends BaseGameModel<O> {
  executionOrder() {
    return GameLoaderExecutionOrder.GameSceneModelLoader;
  }
}

export abstract class BaseGameViewModel<O> extends BaseGameModel<O> {
  executionOrder() {
    return GameLoaderExecutionOrder.GameViewModelLoader;
  }
}
