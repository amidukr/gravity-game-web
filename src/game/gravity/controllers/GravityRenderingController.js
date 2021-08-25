import { GameVisualResources } from "../../../common/framework/game/rendering/GameVisualResources"

export class GravityRenderingController {
  execute(event) {
      const gameResources = event.application.getComponentByType(GameVisualResources).get()

      gameResources.rootScene.
  }
}
