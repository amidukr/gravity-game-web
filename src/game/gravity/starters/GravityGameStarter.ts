import { TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEngine } from "../../../common/framework/game/GameEngine";
import { SimpleGameLevelDescriptor } from "../../../common/framework/game/level/implementation/SimpleGameLevelDescriptor";
import { CoreGameLoader } from "../../../common/framework/game/loader/core/CoreGameLoader";

export class GravityGameStarter {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  async start(application: Application) {
    if(!window.location.hash) {
      window.location.hash = "levels/uzora"
    }

    const levelName = window.location.hash.substr(1);

    await application.getComponent(CoreGameLoader).loadGame({
      levelDescriptor: new SimpleGameLevelDescriptor(levelName),
    });

    await application.getComponent(GameEngine).startGameEngine();
  }
}
