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
    const application = view.application;

    for (const loop of view.processingLoops) {
      try {
        loop.start && loop.start(view, application);
      } catch (err) {
        console.error("Game view processing loop error", err);
      }
    }

    for (const loop of view.renderingLoops) {
      try {
        loop.start && loop.start(view, application);
      } catch (err) {
        console.error("Game view rendering loop error", err);
      }
    }
  }

  async startGameEngine(): Promise<void> {
    this.gameStarted = true;
    await Promise.all(this.__list.map((view) => this.startView(view)));
  }
}