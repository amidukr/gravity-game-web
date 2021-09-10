import { Quaternion, Vector3 } from "three";
import { ApplicationComponent, TYPE_ApplicationComponent } from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameLoader, TYPE_GameLoader } from "../../../common/framework/game/loader/core/GameLoader";
import { LoadGameObject } from "../../../common/framework/game/loader/core/LoadGameObject";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";
import { GravityGameModel, GravityGameModelObject, SceneComponentCollection, TYPE_GravityGameModel } from "../model/GravityGameModelObject";

declare global {
  interface Window {
    gameModel: GravityGameModel;
    gameLevel: GravityGameLevel;
  }
}

export class GravityGameLoader implements GameLoader, ApplicationComponent {
  private gameModel!: GravityGameModel;
  private gameLevel!: GravityGameLevel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoader);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
    this.gameModel = application.getComponent(TYPE_GravityGameModel);
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);

    window.gameModel = this.gameModel;
    window.gameLevel = this.gameLevel;
  }

  async loadGame(loadGameObject: LoadGameObject): Promise<void> {
    const modelObject = new GravityGameModelObject();
    this.gameModel.object = modelObject;

    const startPosition = this.gameLevel.object.rootScene.getObjectByName("Start-Position");

    if (startPosition == null) {
      throw Error("Can't find Start-Position object in scene");
    }

    modelObject.spaceShips.player.throttle = this.gameLevel.object.data.spaceShips.player.throttle || 0.1;

    modelObject.spaceShips.player.position = startPosition.getWorldPosition(new Vector3());
    modelObject.view.quaternion = startPosition
      .getWorldQuaternion(new Quaternion())
      .multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2));

    const prefixMap = {
      "Planet-": "planets",
      "Star-": "stars",
    };

    Object.keys(prefixMap).forEach((prefix) => {

      const  prefixCollectionName: string = (prefixMap as any)[prefix]
      const collection: SceneComponentCollection = (modelObject.sceneDictionary as any)[prefixCollectionName];

      this.gameLevel.object.rootScene.traverse((x) => {
        if (x.name.startsWith(prefix)) {
          collection[x.name] = {
            object: x
          }
        }
      });
    });

  }
}
