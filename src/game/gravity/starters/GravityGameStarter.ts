import { TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { SimpleLoadLevelGameArgument } from "../../../common/game/engine/features/level/implementation/SimpleGameLevelDescriptor";
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

    await application.getComponent(GameEngine).startNewGame(new SimpleLoadLevelGameArgument(levelName));
  }
}
