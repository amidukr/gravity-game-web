import { Introspection } from "../../../common/app/lookup/Introspection";
import {
  GameLoader,
  TYPE_GameLoader,
} from "../../../common/framework/game/loader/core/GameLoader";
import { GameModel } from "../../../common/framework/game/model/GameModel";

import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import {
  GravityGameModelObject,
  TYPE_GravityGameModel,
} from "../model/GravityGameModelObject";
import { LoadGameObject } from "../../../common/framework/game/loader/core/LoadGameObject";
import { GameLevel } from "../../../common/framework/game/level/GameLevel";
import {
  GravityGameLevelObject,
  TYPE_GravityGameLevel,
} from "../level/GravityGameLevelObject";
import { CubeTextureLoader, EquirectangularReflectionMapping, Quaternion, TextureLoader, Vector3 } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class GravityGameLoader implements GameLoader, ApplicationComponent {
  private gameModel!: GameModel<GravityGameModelObject>;
  private gameLevel!: GameLevel<GravityGameLevelObject>;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLoader);
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
    this.gameModel = application.getComponent(TYPE_GravityGameModel);
    this.gameLevel = application.getComponent(TYPE_GravityGameLevel);
  }

  async loadGame(loadGameObject: LoadGameObject): Promise<void> {
    const modelObject = new GravityGameModelObject();
    this.gameModel.object = modelObject;
    const level = this.gameLevel.object;

    const levelPlayerSpaceShip = this.gameLevel.object.data.spaceShips.player;

    modelObject.spaceShips.player.position.fromArray(
      levelPlayerSpaceShip.position
    );

    modelObject.viewQuaternion = new Quaternion().setFromUnitVectors(
      new Vector3(0, 0, -1),
      new Vector3().fromArray(levelPlayerSpaceShip.velocity)
    );

    const gtlfLoader = new GLTFLoader();

    const gameScenePromise = new Promise<GLTF>((r) =>
      gtlfLoader.load(`${level.levelFolder}/${level.data.levelSceneFile}`, r)
    );

    const cubeTextureLoader = new CubeTextureLoader();
    cubeTextureLoader.setPath(level.levelFolder);

    if(level.data.backgroundFiles.length == 6) {
      level.backhroundTexture = cubeTextureLoader.load(
        level.data.backgroundFiles
      );
    }else{
      level.backhroundTexture = new TextureLoader().load( `${level.levelFolder}/${level.data.backgroundFiles[0]}` )
      level.backhroundTexture.mapping = EquirectangularReflectionMapping
    }

    level.rootScene = (await gameScenePromise).scene;
  }
}
