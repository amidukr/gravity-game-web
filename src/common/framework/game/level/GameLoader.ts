import { Application } from "../../../app/Application";
import { ApplicationComponentMeta } from "../../../app/lookup/ApplicationComponentMeta";
import { GameEngine } from "../GameEngine";
import { GameModel } from "../model/GameModel";
import { GameVisualResources } from "../rendering/GameVisualResources";
import {
  GameLevelRepository,
  TYPE_GameLevelRepository,
} from "./api/GameLevelRepository";
import { LevelDescriptor } from "./LevelDescriptor";
import * as THREE from "three";
import {
  GameEngineConfigurer,
  TYPE_GameEngineConfigurer,
} from "./api/GameEngineConfigurer";

export class GameLoader {
  private gameLevelRepository!: GameLevelRepository;
  private gameVisualResources!: GameVisualResources;
  private gameEngine!: GameEngine;
  private gameModel!: GameModel;
  private gameEngineConfigurer!: GameEngineConfigurer;

  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, "GameLoader");
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  autowire(application: Application) {
    this.gameLevelRepository = application.getComponent(
      TYPE_GameLevelRepository
    );
    this.gameVisualResources = application.getComponent(GameVisualResources);
    this.gameEngine = application.getComponent(GameEngine);
    this.gameModel = application.getComponent(GameModel);
    this.gameEngineConfigurer = application.getComponent(
      TYPE_GameEngineConfigurer
    );
  }

  preprocess(gameModel: GameModel) {
    const persistentShared = gameModel.persistentShared;

    const playerSpaceShip = persistentShared.spaceShips.player;

    playerSpaceShip.quaternion = new THREE.Quaternion()
      .setFromUnitVectors(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3().fromArray(playerSpaceShip.direction)
      )
      .toArray();
  }

  async loadGame(levelDescriptor: LevelDescriptor) {
    const level = await this.gameLevelRepository.loadLevel(
      levelDescriptor.levelName
    );

    this.gameModel.reset();
    this.gameModel.persistentShared = level.data.persistentShared;
    this.gameModel.persistentLocal = level.data.persistentLocal;
    this.gameModel.transient = level.data.transient;

    this.preprocess(this.gameModel);

    this.gameVisualResources.value = { rootScene: level.rootScene };

    this.gameEngineConfigurer.configure(this.gameEngine);
  }
}
