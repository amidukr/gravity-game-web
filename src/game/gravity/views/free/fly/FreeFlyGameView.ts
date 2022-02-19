import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";
import { FreeFlyButtonHandler } from "./FreeFlyButtonHandler";
import { FreeFlyProcessingLoop } from "./FreeFlyProcessingLoop";
import { FreeFlyRenderingLoop } from "./FreeFlyRenderingLoop";
import { FreeFlySaveLoadHandler } from "./FreeFlySaveLoadHandler";
import { FreeFlyThrottleControlLoop } from "./FreeFlyThrottleControlLoop";

export class FreeFlyGameView extends GameView {
  constructor(application: ApplicationContainer) {
    const viewContainer = new ApplicationContainer({
      parentContainer: application,
    });

    viewContainer.registerComponent(new FreeFlyButtonHandler());
    viewContainer.registerComponent(new FreeFlySaveLoadHandler());
    viewContainer.registerComponent(new FreeFlyThrottleControlLoop());
    viewContainer.registerComponent(new FreeFlyProcessingLoop());
    viewContainer.registerComponent(new FreeFlyRenderingLoop());

    super({
      container: viewContainer,
    });
  }
}
