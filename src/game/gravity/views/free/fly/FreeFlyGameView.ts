import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { GameView } from "../../../../../common/game/engine/ui/view/GameView";
import { GravityGameViewPlugin } from "../../../plugins/GravityGameViewPlugin";
import { FreeFlyButtonHandler } from "./FreeFlyButtonHandler";
import { FreeFlyProcessingLoop } from "./FreeFlyProcessingLoop";
import { FreeFlySaveLoadHandler } from "./FreeFlySaveLoadHandler";
import { FreeFlyThrottleControlLoop } from "./FreeFlyThrottleControlLoop";
import { FreeFlyUpdateCamerPositionLooper } from "./FreeFlyUpdateCamerPositionLooper";

export class FreeFlyGameView extends GameView {
  constructor(application: ApplicationContainer) {
    const container = new ApplicationContainer({
      parentContainer: application,
    });

    container.registerComponent(new GravityGameViewPlugin());

    container.registerComponent(new FreeFlyButtonHandler());
    container.registerComponent(new FreeFlySaveLoadHandler());
    container.registerComponent(new FreeFlyThrottleControlLoop());
    container.registerComponent(new FreeFlyProcessingLoop());
    container.registerComponent(new FreeFlyUpdateCamerPositionLooper());

    super({
      container: container,
    });
  }
}
