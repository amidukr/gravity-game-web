import { Application } from "../../../../../common/app/Application";
import { GameView } from "../../../../../common/framework/game/ui/view/GameView";
import { OrbitRenderingLoop } from "./OrbitRenderingLoop";

export class OrbitGameView extends GameView {
  constructor(application: Application) {
    super({
      application: application,
      processingLoops: [],
      renderingLoops: [new OrbitRenderingLoop()],
    });
  }
}
