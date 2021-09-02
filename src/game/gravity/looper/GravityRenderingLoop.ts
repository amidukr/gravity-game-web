import * as THREE from "three";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEvent } from "../../../common/framework/game/GameEvent";
import {
  GameLoop,
  TYPE_GameLooper,
} from "../../../common/framework/game/looper/GameLoop";
import { GameModel } from "../../../common/framework/game/model/GameModel";
import { GameVisualResources } from "../../../common/framework/game/rendering/GameVisualResources";
import { ThreeJsRenderer } from "../../../common/framework/game/rendering/ThreeJsRenderer";

export class GravityRenderingLoop implements GameLoop {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLooper);
  }

  start(application: Application) {
    this.renderer = application
      .getComponent(ThreeJsRenderer)
      .getThreeJsWebGlRenderer();

    const gameResources = application.getComponent(GameVisualResources);

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

  execute(event: GameEvent) {
    const gameModel = event.application.getComponent(GameModel);

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
