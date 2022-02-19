import { TYPE_GameLoopStarter } from "../../looper/GameLoopStarter";
import { GameView } from "./GameView";

export class GameViewCollection {
  private __list: GameView[] = [];
  private gameStarted: Boolean = false;

  async bindView(view: GameView) {
    if (this.__list.indexOf(view) == -1) {
      if (this.gameStarted) {
        await this.startView(view);
      }

      this.__list.push(view);
    }
  }

  unbindView(view: GameView) {
    const index = this.__list.indexOf(view);
    if (index !== -1) {
      this.__list.splice(index, 1);
    }
  }

  get list(): GameView[] {
    return this.__list;
  }

  async startView(view: GameView): Promise<void> {
    const viewContainer = view.container;

    await viewContainer.start();

    const startersList = viewContainer.getComponentList(TYPE_GameLoopStarter);

    for (const startable of startersList) {
      try {
        startable.startNewGame();
      } catch (err) {
        console.error("GameViewCollections", `Error while starting ${typeof startable} `, startable, err);
      }
    }
  }

  async startNewGame(): Promise<void> {
    this.gameStarted = true;
    await Promise.all(this.__list.map((view) => this.startView(view)));
  }
}
