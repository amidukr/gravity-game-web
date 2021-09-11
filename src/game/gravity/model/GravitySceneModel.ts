import { Object3D, Scene } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BaseGameModel } from "../../../common/framework/game/model/BaseGameModel";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";

export interface SceneComponent {
  object: Object3D;
}

export interface SceneComponentCollection {
  [name: string]: SceneComponent;
}

export class SceneDictionary {
  stars: SceneComponentCollection = {};
  planets: SceneComponentCollection = {};

  getCollection(name: string): SceneComponentCollection {
    return (this as any)[name];
  }
}

export class GravityScene {
  scene: Scene = new Scene();
  sceneDictionary = new SceneDictionary();
}

export class GravitySceneModel extends BaseGameModel<GravityScene> {
  gameLevel!: GravityGameLevel;

  autowire(application: ApplicationContainer): void {
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
  }

  private buildSceneDictionary(sceneDictionary: SceneDictionary) {
    const prefixMap = {
      "Planet-": "planets",
      "Star-": "stars",
    };

    Object.keys(prefixMap).forEach((prefix) => {
      const prefixCollectionName = (prefixMap as any)[prefix];
      const collection: SceneComponentCollection = sceneDictionary.getCollection(prefixCollectionName);

      this.gameLevel.object.rootScene.traverse((x) => {
        if (x.name.startsWith(prefix)) {
          collection[x.name] = {
            object: x,
          };
        }
      });
    });
  }

  construtNewObject(): GravityScene {
    const mainViewObject = new GravityScene();

    this.buildSceneDictionary(mainViewObject.sceneDictionary);

    return mainViewObject;
  }
}
