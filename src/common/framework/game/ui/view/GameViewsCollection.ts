import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { GameView } from "./GameView";

interface ViewStartable {
  startNewGame?(application: ApplicationContainer, view: GameView): Promise<void> | void;
}

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

    const startableList: ViewStartable[] = ([] as ViewStartable[])
      .concat(view.processingLoops)
      .concat(view.renderingLoops)
      .concat(view.buttonHandlerCollection);

    for (const startable of startableList) {
      try {
        startable.startNewGame && (await startable.startNewGame(application, view));
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
