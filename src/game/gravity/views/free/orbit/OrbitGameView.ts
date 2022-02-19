import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { GameView } from "../../../../../common/game/engine/ui/view/GameView";
import { OrbitRenderingLoop } from "./OrbitRenderingLoop";

export class OrbitGameView extends GameView {
  constructor(application: ApplicationContainer) {
    const container = new ApplicationContainer({
      parentContainer: application,
    });

    container.registerComponent(new OrbitRenderingLoop());

    super({
      container: container,
    });
  }
}
