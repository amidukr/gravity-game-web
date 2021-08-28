import * as THREE from "three";
import { Application } from "../../../common/app/Application";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GameEngine } from "../../../common/framework/game/GameEngine";
import { GameModel } from "../../../common/framework/game/model/GameModel";
import { GameVisualResources } from "../../../common/framework/game/rendering/GameVisualResources";
import { GravityRenderingController } from "../controllers/GravityRenderingController";
import { SpaceShipPhysicsController } from "../controllers/SpaceShipPhysicsController";
import { GravityGameLevelRepository } from "./GravityGameLevelRepository";

export class GravityGameLoader {
  private application!: Application;
  private gameLevelRepository!: GravityGameLevelRepository;
  private gameVisualResources!: GameVisualResources;
  private gameEngine!: GameEngine;
  private gameModel!: GameModel;

  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, "GameLoader");
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  autowire(application: Application) {
    this.application = application;

    this.gameLevelRepository = application.getComponent("GameLevelRepository");
    this.gameVisualResources = application.getComponent("GameVisualResources");
    this.gameEngine = application.getComponent("GameEngine");
    this.gameModel = application.getComponent("GameModel");
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

  async loadGame(levelDescriptor: any) {
    const level = await this.gameLevelRepository.loadLevel(
      levelDescriptor.levelName
    );

    this.gameModel.reset();
    this.gameModel.persistentShared = level.data.persistentShared;

    this.preprocess(this.gameModel);

    this.gameVisualResources.value = { rootScene: level.rootScene };

    this.gameEngine.registerController(new GravityRenderingController());
    this.gameEngine.registerController(new SpaceShipPhysicsController());
  }
}
