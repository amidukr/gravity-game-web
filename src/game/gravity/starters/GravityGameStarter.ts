import { TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEngine } from "../../../common/framework/game/GameEngine";
import { SimpleGameLevelDescriptor } from "../../../common/framework/game/level/implementation/SimpleGameLevelDescriptor";
import { GameLoader } from "../../../common/framework/game/loader/GameLoader";

export class GravityGameStarter {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  async start(application: ApplicationContainer) {
    if (!window.location.hash) {
      window.location.hash = "levels/uzora";
    }

    const levelName = window.location.hash.substr(1);

    await application.getComponent(GameLoader).loadGame({
      levelDescriptor: new SimpleGameLevelDescriptor(levelName),
    });

    await application.getComponent(GameEngine).startNewGame();
  }
}
