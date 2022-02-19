import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";
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
