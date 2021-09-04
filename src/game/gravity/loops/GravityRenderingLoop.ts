import * as THREE from "three";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameEvent } from "../../../common/framework/game/GameEvent";
import {
  GameLoop,
  TYPE_GameLooper,
} from "../../../common/framework/game/looper/GameLoop";
import { GameModel } from "../../../common/framework/game/model/GameModel";
import { ThreeJsRenderer } from "../../../common/framework/game/rendering/ThreeJsRenderer";
import { TYPE_GravityGameLevel } from "../level/GravityGameLevelObject";
import {
  GravityGameModelObject,
  TYPE_GravityGameModel,
} from "../model/GravityGameModelObject";

export class GravityRenderingLoop implements GameLoop {
  private model!: GameModel<GravityGameModelObject>;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_GameLooper);
  }

  start(application: Application) {
    this.model = application.getComponent(TYPE_GravityGameModel);
    this.renderer = application
      .getComponent(ThreeJsRenderer)
      .getThreeJsWebGlRenderer();

    const gameLevel = application.getComponent(TYPE_GravityGameLevel);

    this.scene = new THREE.Scene();
    this.scene.add(gameLevel.object.rootScene);
    this.scene.background = gameLevel.object.backhroundTexture;

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer.physicallyCorrectLights = true;
  }

  execute(event: GameEvent) {
    this.camera.position.copy(this.model.object.spaceShips.player.position);
    this.camera.setRotationFromQuaternion(
      new THREE.Quaternion().copy(this.model.object.viewQuaternion).normalize()
    );

    this.renderer.render(this.scene, this.camera);
  }
}
