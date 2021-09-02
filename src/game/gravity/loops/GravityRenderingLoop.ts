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
import { GravityGameModel } from "../model/GravityGameModel";

export class GravityRenderingLoop implements GameLoop {
  private model!: GravityGameModel;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLooper);
  }

  start(application: Application) {
    this.model = application.getComponent(GravityGameModel);
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
    const persistentShared = this.model.persistentShared;
    const persistentLocal = this.model.persistentLocal;

    this.camera.position.fromArray(persistentShared.spaceShips.player.position);
    this.camera.setRotationFromQuaternion(
      new THREE.Quaternion()
        .fromArray(persistentLocal.spaceShips.player.viewQuanterion)
        .normalize()
    );

    this.renderer.render(this.scene, this.camera);
  }
}
