import * as THREE from "three";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GravityRenderingController } from "../controllers/GravityRenderingController";
import { SpaceShipPhysicsController } from "../controllers/SpaceShipPhysicsController";

export class GravityGameLoader {
  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, "GameLoader");
    ApplicationComponentMeta.bindToGlobalFunctions(this);
  }

  autowire(application) {
    this.application = application;

    this.gameLevelRepository = application.getComponent("GameLevelRepository");
    this.gameVisualResources = application.getComponent("GameVisualResources");
    this.gameEngine = application.getComponent("GameEngine");
    this.gameModel = application.getComponent("GameModel");
  }

  preprocess(gameModel) {
    const persistentShared = gameModel.getPersistentShared();

    const playerSpaceShip = persistentShared.spaceShips.player;

    playerSpaceShip.quaternion = new THREE.Quaternion()
      .setFromUnitVectors(
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3().fromArray(playerSpaceShip.direction)
      )
      .toArray();
  }

  async loadGame(levelDescriptor) {
    const level = await this.gameLevelRepository.loadLevel(
      levelDescriptor.levelName
    );

    this.gameModel.reset();
    this.gameModel.setPersistentShared(level.data.persistentShared);

    this.preprocess(this.gameModel);

    this.gameVisualResources.set({ rootScene: level.rootScene });

    this.gameEngine.registerController(new GravityRenderingController());
    this.gameEngine.registerController(new SpaceShipPhysicsController());
  }
}
