import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { BaseGamePreRenderingLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";
import { GravityCloseSpaceRenderer } from "./GravityCloseSpaceRenderer";

export class GravityCloseSpaceLoop extends BaseGamePreRenderingLooper {
  closeSpaceRenderer!: GravityCloseSpaceRenderer;

  override autowire(application: ApplicationContainer): void {
    this.closeSpaceRenderer = application.getComponent(GravityCloseSpaceRenderer);
  }

  override startNewGame(): void | Promise<void> {
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.000001, 1000);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);

    camera.position.z = 5

    scene.add(cube);

    this.closeSpaceRenderer.enabled = true;
    this.closeSpaceRenderer.camera = camera;
    this.closeSpaceRenderer.scene = scene;
  }

  override execute(event: GameEvent): void {}
}
