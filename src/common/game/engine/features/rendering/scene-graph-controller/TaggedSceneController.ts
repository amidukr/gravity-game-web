import { Introspection } from "../../../../../app/lookup/Introspection";
import { BaseApplicationComponent } from "../../../../../app/utils/BaseApplicationComponent";
import { LifecycleStage } from "../../../../../app/utils/LifecycleStage";
import { GameLoader, TYPE_GameStarter } from "../../../core/GameLoader";
import { GameLoaderExecutionOrder } from "../../../framework/GameLoaderTypes";
import { SceneSubscribeContext } from "./SceneSubscribeContext";
import { TaggedEngineEventsListener, TaggedSceneEngine, TYPE_TaggedEngineEventsListener } from "./TaggedSceneEngine";

export abstract class TaggedSceneController extends BaseApplicationComponent implements GameLoader, TaggedEngineEventsListener {
  constructor() {
    super();
    Introspection.bindInterfaceName(this, TYPE_TaggedEngineEventsListener);
    Introspection.bindInterfaceName(this, TYPE_GameStarter);
  }

  executionOrder(): LifecycleStage {
    return GameLoaderExecutionOrder.TaggedSceneControllerStarter;
  }

  startNewGame(): void | Promise<void> {}

  onNewEngine(engine: TaggedSceneEngine) {
    this.subscribe(new SceneSubscribeContext(engine));
  }

  abstract subscribe(ctx: SceneSubscribeContext): void;
}
