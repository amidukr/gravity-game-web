import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BaseGameLoaderModule } from "../../../common/framework/game/loader/BaseGameLoaderModule";
import { LoadGameObject } from "../../../common/framework/game/loader/object/LoadGameObject";
import { GravityGameLevel } from "../level/GravityGameLevelObject";
import { GravityUniverseModel } from "../model/GravityUniverseModel";

export class GravityUniverseLoader extends BaseGameLoaderModule {
  gameLevel!: GravityGameLevel;
  gravityUniverseModel!: GravityUniverseModel;

  autowire(application: ApplicationContainer): void {
    throw new Error("Method not implemented.");
  }

  startNewGame(loadGameObject: LoadGameObject): void | Promise<void> {
    throw new Error("Method not implemented.");
  }
}
