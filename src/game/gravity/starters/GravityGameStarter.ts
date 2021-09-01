import { TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GameEngine } from "../../../common/framework/game/GameEngine";
import { GameLoader } from "../../../common/framework/game/level/GameLoader";

export class GravityGameStarter {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  async start(application: Application) {
    await application.getComponent(GameLoader).loadGame({ levelName: "demo" });
    application.getComponent(GameEngine).start();
  }
}
