import { TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEngine } from "../../../common/framework/game/GameEngine";
import { CoreGameLoader } from "../../../common/framework/game/loader/core/CoreGameLoader";
import { SimpleGameLevelDescriptor } from "../../../common/framework/game/level/implementation/SimpleGameLevelDescriptor";
import { MainViewInputMappings } from "../input/mappings/GravityGameInputMappings";

export class GravityGameStarter {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  async start(application: Application) {
    await application.getComponent(CoreGameLoader).loadGame({
      levelDescriptor: new SimpleGameLevelDescriptor("demo"),
    });

    await application.getComponent(GameEngine).startGameEngine();
  }
}
