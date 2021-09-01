import * as THREE from "three";
import { Application } from "../../../common/app/Application";
import { ApplicationComponentMeta } from "../../../common/app/lookup/ApplicationComponentMeta";
import { GameEvent } from "../../../common/framework/game/GameEvent";
import {
  GameLooper,
  TYPE_GameLooper,
} from "../../../common/framework/game/looper/GameLooper";
import { GameModel } from "../../../common/framework/game/model/GameModel";
import { GameVisualResources } from "../../../common/framework/game/rendering/GameVisualResources";
import { ThreeJsRenderer } from "../../../common/framework/game/rendering/ThreeJsRenderer";

export class GravityRenderingLooper implements GameLooper {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  constructor() {
    ApplicationComponentMeta.bindInterfaceName(this, TYPE_GameLooper);
  }

  start(application: Application) {
    this.renderer = application
      .getComponent(ThreeJsRenderer)
      .getThreeJsWebGlRenderer();

    const gameResources: GameVisualResources = application.getComponent(
      "GameVisualResources"
    );

    this.scene = new THREE.Scene();
    this.scene.add(gameResources.value.rootScene);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer.physicallyCorrectLights = true;
  }

  run(event: GameEvent) {
    const gameModel: GameModel = event.application.getComponent("GameModel");

    const persistentShared = gameModel.persistentShared;

    this.camera.position.fromArray(persistentShared.spaceShips.player.position);
    this.camera.setRotationFromQuaternion(
      new THREE.Quaternion()
        .fromArray(persistentShared.spaceShips.player.quaternion)
        .normalize()
    );

    this.renderer.render(this.scene, this.camera);
  }
}
