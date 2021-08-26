import { Promise } from "bluebird";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";

export class GravityGameLevelRepository {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, "GameLevelRepository");
  }

  async loadLevel(levelName) {
    const loader = new GLTFLoader();

    const gameScene = await new Promise((r) =>
      loader.load("res/" + levelName, r)
    );

    return { rootScene: gameScene };
  }
}
