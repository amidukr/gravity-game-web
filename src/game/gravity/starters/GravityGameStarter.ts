import { TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEngine } from "../../../common/framework/game/GameEngine";
import { GameLoader } from "../../../common/framework/game/level/GameLoader";

export class GravityGameStarter {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  async start(application: Application) {
    await application.getComponent(GameLoader).loadGame({ levelName: "demo" });
    application.getComponent(GameEngine).start();
  }
}
