import { Promise } from "bluebird";
import { CubeTextureLoader, EquirectangularReflectionMapping, TextureLoader } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GravityGameLevelObject } from "../../../../../game/gravity/level/GravityGameLevelObject";
import { Introspection } from "../../../../app/lookup/Introspection";
import { GameLevelRepository, TYPE_GameLevelRepository } from "../../level/GameLevelRepository";
import { SimpleGameLevelDescriptor } from "../../level/implementation/SimpleGameLevelDescriptor";

export class ThreeJsGameLevelRepository implements GameLevelRepository {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLevelRepository);
  }
  async loadLevel(levelDescriptor: SimpleGameLevelDescriptor): Promise<GravityGameLevelObject> {
    const levelName = levelDescriptor.levelName;

    const resourceRootFolder = `resources/game/gravity/`;

    const levelFilePath = `${resourceRootFolder}/${levelName}/level.json`;

    const levelData = await (await fetch(levelFilePath)).json();

    const levelObject = new GravityGameLevelObject();

    levelObject.data = levelData;
    levelObject.resourceRootFolder = resourceRootFolder;

    const gtlfLoader = new GLTFLoader();

    const gameScenePromise = new Promise<GLTF>((r) =>
      gtlfLoader.load(`${levelObject.resourceRootFolder}/${levelObject.data.levelSceneFile}`, r)
    );

    const cubeTextureLoader = new CubeTextureLoader();
    cubeTextureLoader.setPath(levelObject.resourceRootFolder);

    if (levelObject.data.backgroundFiles.length == 6) {
      levelObject.backhroundTexture = cubeTextureLoader.load(levelObject.data.backgroundFiles);
    } else {
      levelObject.backhroundTexture = new TextureLoader().load(
        `${levelObject.resourceRootFolder}/${levelObject.data.backgroundFiles[0]}`
      );
      levelObject.backhroundTexture.mapping = EquirectangularReflectionMapping;
    }

    levelObject.rootScene = (await gameScenePromise).scene;

    return levelObject;
  }
}
