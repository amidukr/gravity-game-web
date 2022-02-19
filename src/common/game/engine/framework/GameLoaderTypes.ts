import { BaseGameLoader } from "../core/GameLoader";

export enum GameLoaderExecutionOrder {
  GameLevelLoader = 100000,
  GameStateModelLoader = 200000,
  GameViewLoader = 300000,
  GameLooperStarter = 400000,
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
