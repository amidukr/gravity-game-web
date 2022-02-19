import { BaseGameLoader as BaseGameLoaderModule } from "../core/GameLoader";

export enum GameLoaderExecutionOrder {
  GameLevelModelLoader = 100000,
  GameLevelLoader = 200000,

  GameCoreModelLoader = 300000,

  GameStateModelLoader = 400000,
  GameStateLoader = 500000,

  GameViewModelLoader = 600000,
  GameViewLoader = 700000,

  GameSceneLoader = 800000,

  GameLooperStarter = 900000,
}

export abstract class BaseGameLevelLoader extends BaseGameLoaderModule {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameLevelLoader;
  }
}

export abstract class BaseGameStateModelLoader extends BaseGameLoaderModule {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameStateModelLoader;
  }
}

export abstract class BaseGameSceneLoader extends BaseGameLoaderModule {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameSceneLoader;
  }
}

export abstract class BaseGameViewModelLoader extends BaseGameLoaderModule {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameViewLoader;
  }
}
