import { Promise } from "bluebird";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import {
  GameLevelRepository,
  TYPE_GameLevelRepository,
} from "../../../common/framework/game/level/api/GameLevelRepository";

export class GravityGameLevelRepository implements GameLevelRepository {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_GameLevelRepository);
  }

  async loadLevel(levelName: string): Promise<any> {
    const levelFolder = `resources/game/gravity/levels/${levelName}`;

    const levelFilePath = `${levelFolder}/level.json`;

    const levelData = await (await fetch(levelFilePath)).json();

    console.debug("GravityGameLevelRepository", "levelData", levelData);

    const loader = new GLTFLoader();

    const gameScene: any = await new Promise((r) =>
      loader.load(`${levelFolder}/${levelData.levelSceneFile}`, r)
    );

    return {
      data: levelData,
      rootScene: gameScene.scene,
    };
  }
}
