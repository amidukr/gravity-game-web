import { Promise } from "bluebird";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";

export class GravityGameLevelRepository {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, "GameLevelRepository");
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
