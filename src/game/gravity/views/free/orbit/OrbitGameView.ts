import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { GameView } from "../../../../../common/game/engine/ui/view/GameView";
import { GravityGameViewPlugin } from "../../../plugins/GravityGameViewPlugin";
import { OrbitUpdateCameraPositionLooper } from "./OrbitUpdateCameraPositionLooper";

export class OrbitGameView extends GameView {
  constructor(application: ApplicationContainer) {
    const container = new ApplicationContainer({
      parentContainer: application,
    });

    container.registerComponent(new GravityGameViewPlugin());

    container.registerComponent(new OrbitUpdateCameraPositionLooper());

    super({
      container: container,
    });
  }
}
