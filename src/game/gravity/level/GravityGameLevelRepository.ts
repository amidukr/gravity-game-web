import { Promise } from "bluebird";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Introspection } from "../../../common/app/lookup/Introspection";
import {
  GameLevelRepository,
  TYPE_GameLevelRepository,
} from "../../../common/framework/game/level/GameLevelRepository";
import { GravityGameLevelDescriptor } from "./GravityGameLevelDescriptor";
import { GravityGameLevelObject } from "./GravityGameLevelObject";

export class GravityGameLevelRepository implements GameLevelRepository {
  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLevelRepository);
  }
  async loadLevel(
    levelDescriptor: GravityGameLevelDescriptor
  ): Promise<GravityGameLevelObject> {
    const levelName = levelDescriptor.levelName;

    const levelFolder = `resources/game/gravity/levels/${levelName}`;

    const levelFilePath = `${levelFolder}/level.json`;

    const levelData = await (await fetch(levelFilePath)).json();

    const levelObject = new GravityGameLevelObject();

    levelObject.data = levelData;
    levelObject.levelFolder = levelFolder;

    return levelObject;
  }
}
