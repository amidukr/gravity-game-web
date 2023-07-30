import { LifecycleStage } from "../../../app/utils/LifecycleStage";
import { BaseGameLoader as BaseGameLoaderModule } from "../core/GameLoader";

export const GameObjectConstructorStage = new LifecycleStage();

export abstract class GameLoaderExecutionOrder {
  static GameLoaderRootStage = LifecycleStage.root();

  static GameObjectConstructor = LifecycleStage.runAfter(GameLoaderExecutionOrder.GameLoaderRootStage);
  static GameLevelLoader = LifecycleStage.runAfter(GameLoaderExecutionOrder.GameObjectConstructor);
  static GameRootSceneLoader = LifecycleStage.runAfter(GameLoaderExecutionOrder.GameLevelLoader);
  static GameSceneIndexer = LifecycleStage.runAfter(GameLoaderExecutionOrder.GameRootSceneLoader);
  static GameModelLoader = LifecycleStage.runAfter(GameLoaderExecutionOrder.GameSceneIndexer);
  static GameViewLoader = LifecycleStage.runAfter(GameLoaderExecutionOrder.GameModelLoader);
  static GameSceneLoader = LifecycleStage.runAfter(GameLoaderExecutionOrder.GameViewLoader);
  static GameLooperStarter = LifecycleStage.runAfter(GameLoaderExecutionOrder.GameSceneLoader);
  static TaggedSceneControllerStarter = LifecycleStage.runAfter(GameLoaderExecutionOrder.GameLooperStarter);
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

export abstract class BaseGameSceneIndexerLoader extends BaseGameLoaderModule {
  override executionOrder() {
    return GameLoaderExecutionOrder.GameSceneIndexer;
  }
}
