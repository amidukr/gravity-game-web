import { BaseGameLoader } from "../core/GameLoader";

enum GameLoaderExecutionOrder {
  GameLevelLoader = 100000,
  GameStateModelLoader = 200000,
  GameViewLoader = 300000,
  GameLoopStarter = 400000,
}

export abstract class BaseGameLevelLoader extends BaseGameLoader {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameLevelLoader;
  }
}

export abstract class BaseGameStateModelLoader extends BaseGameLoader {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameStateModelLoader;
  }
}

export abstract class BaseGameViewModelLoader extends BaseGameLoader {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameViewLoader;
  }
}

export abstract class BaseGameLooperStarter extends BaseGameLoader {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameLoopStarter;
  }
}
