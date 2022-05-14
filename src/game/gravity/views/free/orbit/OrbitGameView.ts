import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { ThreeJsGameOrbitCamera } from "../../../../../common/game/engine/3rd-party/threejs/OrbitUpdateCameraPositionLooper";
import { GameView } from "../../../../../common/game/engine/ui/view/GameView";
import { GravityGameViewPlugin } from "../../../plugins/GravityGameViewPlugin";

export class OrbitGameView extends GameView {
  constructor(application: ApplicationContainer) {
    const container = new ApplicationContainer({
      parentContainer: application,
    });

    container.registerComponent(new GravityGameViewPlugin());

    container.registerComponent(new ThreeJsGameOrbitCamera());

    super({
      container: container,
    });
  }
}
