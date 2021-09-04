import { Promise } from "bluebird";
import {
  CubeTextureLoader,
  EquirectangularReflectionMapping,
  TextureLoader,
} from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Introspection } from "../../../../app/lookup/Introspection";
import {
  GameLevelRepository,
  TYPE_GameLevelRepository,
} from "../../level/GameLevelRepository";
import { SimpleGameLevelDescriptor } from "../../level/implementation/SimpleGameLevelDescriptor";
import { GravityGameLevelObject } from "../../../../../game/gravity/level/GravityGameLevelObject";

export class ThreeJsGameLevelRepository implements GameLevelRepository {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLevelRepository);
  }
  async loadLevel(
    levelDescriptor: SimpleGameLevelDescriptor
  ): Promise<GravityGameLevelObject> {
    const levelName = levelDescriptor.levelName;

    const levelFolder = `resources/game/gravity/levels/${levelName}`;

    const levelFilePath = `${levelFolder}/level.json`;

    const levelData = await (await fetch(levelFilePath)).json();

    const levelObject = new GravityGameLevelObject();

    levelObject.data = levelData;
    levelObject.levelFolder = levelFolder;

    const gtlfLoader = new GLTFLoader();

    const gameScenePromise = new Promise<GLTF>((r) =>
      gtlfLoader.load(
        `${levelObject.levelFolder}/${levelObject.data.levelSceneFile}`,
        r
      )
    );

    const cubeTextureLoader = new CubeTextureLoader();
    cubeTextureLoader.setPath(levelObject.levelFolder);

    if (levelObject.data.backgroundFiles.length == 6) {
      levelObject.backhroundTexture = cubeTextureLoader.load(
        levelObject.data.backgroundFiles
      );
    } else {
      levelObject.backhroundTexture = new TextureLoader().load(
        `${levelObject.levelFolder}/${levelObject.data.backgroundFiles[0]}`
      );
      levelObject.backhroundTexture.mapping = EquirectangularReflectionMapping;
    }

    levelObject.rootScene = (await gameScenePromise).scene;

    return levelObject;
  }
}
