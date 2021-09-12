import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";
import { FreeFlyButtonHandler } from "./FreeFlyButtonHandler";
import { FreeFlyRenderingLoop } from "./FreeFlyRenderingLoop";
import { FreeFlySaveLoadHandler } from "./FreeFlySaveLoadHandler";
import { FreeFlyThrottleControlLoop } from "./FreeFlyThrottleControlLoop";
import { FreeFlyProcessingLoop } from "./FreeFlyViewDirectionControlLoop";

export class FreeFlyGameView extends GameView {
  constructor(application: ApplicationContainer) {
    super({
      application: application,
      buttonHandlers: [new FreeFlyButtonHandler(), new FreeFlySaveLoadHandler()],
      processingLoops: [new FreeFlyThrottleControlLoop(), new FreeFlyProcessingLoop()],
      renderingLoops: [new FreeFlyRenderingLoop()],
    });
  }
}
