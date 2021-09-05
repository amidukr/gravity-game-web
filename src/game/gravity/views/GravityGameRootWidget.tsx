import React from "react";
import { Application } from "../../../common/app/Application";
import { GameViewWidget } from "../../../common/framework/game/3rd-party/react/GameViewWidget";
import { GameView } from "../../../common/framework/game/ui/view/GameView";
import { FreeFlyRenderingLoop } from "./free/fly/FreeFlyRenderingLoop";
import { FreeFlyProcessingLoop } from "./free/fly/FreeFlyProcessingLoop";
import { OrbitRenderingLoop } from "./free/orbit/OrbitRenderingLoop";

export interface RootWidgetProps {
  application: Application;
}

export interface RootWidgetState {
  freeFlightGameView: GameView;
}

export class RootWidget extends React.Component<
  RootWidgetProps,
  RootWidgetState
> {
  private viewIndex: number = 0;

  constructor(props: RootWidgetProps) {
    super(props);

    this.viewIndex = 0;

    this.state = this.createState();
  }

  createState() {
    if (this.viewIndex == 0) {
      return {
        freeFlightGameView: new GameView({
          application: this.props.application,
          processingLoops: [new FreeFlyProcessingLoop()],
          renderingLoops: [new FreeFlyRenderingLoop()],
        }),
      };
    } else {
      return {
        freeFlightGameView: new GameView({
          application: this.props.application,
          processingLoops: [],
          renderingLoops: [new OrbitRenderingLoop()],
        }),
      };
    }
  }

  onKeyPress(ev: KeyboardEvent) {
    if (ev.code == "KeyV") {
      this.viewIndex = 1 - this.viewIndex;

      this.setState(this.createState());
    }
  }

  override render() {
    return (
      <div
        ref={(x) => x?.focus()}
        tabIndex={0}
        onKeyPress={this.onKeyPress.bind(this) as any}
      >
        <GameViewWidget gameView={this.state.freeFlightGameView} />
      </div>
    );
  }
}
