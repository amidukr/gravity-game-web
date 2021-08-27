import * as THREE from "three";

export class GravityRenderingController {
  start(application) {
    this.renderer = application
      .getComponent("ThreeJsRenderer")
      .getThreeJsWebGlRenderer();

    const gameResources = application.getComponent("GameVisualResources");

    this.scene = new THREE.Scene();
    this.scene.add(gameResources.get().rootScene);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer.physicallyCorrectLights = true;
  }

  execute(event) {
    const gameModel = event.application.getComponent("GameModel");

    const persistentShared = gameModel.getPersistentShared();

    this.camera.position.fromArray(persistentShared.spaceShips.player.position);
    this.camera.setRotationFromQuaternion(
      new THREE.Quaternion()
        .fromArray(persistentShared.spaceShips.player.quaternion)
        .normalize()
    );

    this.renderer.render(this.scene, this.camera);
  }
}
