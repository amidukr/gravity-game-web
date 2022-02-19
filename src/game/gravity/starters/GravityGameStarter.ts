import { TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { SimpleGameLevelDescriptor } from "../../../common/game/engine/features/level/implementation/SimpleGameLevelDescriptor";
import { GameLoader } from "../../../common/game/engine/features/loader/GameLoader";
import { GameEngine } from "../../../common/game/engine/GameEngine";

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
