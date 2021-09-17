import { Box3, Object3D, Scene, Vector3 } from "three";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { BaseGameModel } from "../../../common/framework/game/model/BaseGameModel";
import { GravityGameLevel, TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";

export interface SceneComponent {
  object: Object3D;
  radius: number;
  position: Vector3;
}

export interface SceneComponentCollection<S extends SceneComponent = SceneComponent> {
  [name: string]: S;
}

export class SceneDictionary {
  stars: SceneComponentCollection = {};
  planets: SceneComponentCollection = {};

  firstStar!: SceneComponent;

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
          const boundingBox = new Box3().setFromObject(x);
          const size = boundingBox.getSize(new Vector3());
          const radius = Math.max(size.x, size.y, size.z) * 0.5;

          collection[x.name] = {
            object: x,
            radius: radius,
            position: x.getWorldPosition(new Vector3()),
          };
        }
      });
    });

    const firstStarName = Object.keys(sceneDictionary.stars)[0];
    sceneDictionary.firstStar = sceneDictionary.stars[firstStarName];
  }

  construtNewObject(): GravityScene {
    const mainViewObject = new GravityScene();

    this.buildSceneDictionary(mainViewObject.sceneDictionary);

    return mainViewObject;
  }
}
