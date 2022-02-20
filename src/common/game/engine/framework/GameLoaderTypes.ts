import { BaseGameLoader as BaseGameLoaderModule } from "../core/GameLoader";

export enum GameLoaderExecutionOrder {
  GameLevelModelLoader = 100_000,
  GameLevelLoader = 200_000,

  GameCoreModelLoader = 300_000,

  GameStateModelLoader = 400_000,
  GameStateLoader = 500_000,

  GameViewModelLoader = 600_000,
  GameViewLoader = 700_000,

  GameSceneModelLoader = 800_000,
  GameSceneLoader = 900_000,

  GameSubSceneModelLoader = 1_000_000,
  GameSubSceneLoader = 1_100_000,

  GameLooperStarter = 1_200_000,
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
