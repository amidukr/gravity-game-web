import { BaseGameLoader as BaseGameLoaderModule } from "../core/GameLoader";

export enum GameLoaderExecutionOrder {
  GameObjectConstructor = 100_000,

  GameLevelLoader = 200_000,
  GameModelLoader = 300_000,
  GameViewLoader = 400_000,
  GameSceneLoader = 500_000,

  GameLooperStarter = 600_000,
}

export abstract class BaseGameLevelLoader extends BaseGameLoaderModule {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameLevelLoader;
  }
}

export abstract class BaseGameModelLoader extends BaseGameLoaderModule {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameModelLoader;
  }
}

export abstract class BaseGameViewModelLoader extends BaseGameLoaderModule {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameViewLoader;
  }
}

export abstract class BaseGameSceneLoader extends BaseGameLoaderModule {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameSceneLoader;
  }
}
