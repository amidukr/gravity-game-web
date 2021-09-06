import React from "react";
import { Application } from "../../../common/app/Application";
import { GameViewWidget } from "../../../common/framework/game/3rd-party/react/GameViewWidget";
import { MappedUserInput } from "../../../common/framework/game/input/MappedUserInput";
import { GameView } from "../../../common/framework/game/ui/view/GameView";
import { CHANGE_VIEW_ACTION, COMMON_GROUP } from "../input/mappings/GravityGameInputMappings";
import { FreeFlyButtonHandler } from "./free/fly/FreeFlyButtonHandler";
import { FreeFlyProcessingLoop } from "./free/fly/FreeFlyProcessingLoop";
import { FreeFlyRenderingLoop } from "./free/fly/FreeFlyRenderingLoop";
import { FreeFlyThrottleControlLoop } from "./free/fly/FreeFlyThrottleControlLoop";
import { OrbitRenderingLoop } from "./free/orbit/OrbitRenderingLoop";

export interface RootWidgetProps {
  application: Application;
}

export interface RootWidgetState {
  freeFlightGameView: GameView;
}

export class RootWidget extends React.Component<RootWidgetProps, RootWidgetState> {
  private viewIndex: number = 0;
  private mappedUserInput: MappedUserInput;

  constructor(props: RootWidgetProps) {
    super(props);

    this.mappedUserInput = props.application.getComponent(MappedUserInput);

    this.viewIndex = 1;

    this.state = this.createState();
  }

  createState() {
    if (this.viewIndex == 0) {
      return {
        freeFlightGameView: new GameView({
          application: this.props.application,
          buttonHandlers: [new FreeFlyButtonHandler()],
          processingLoops: [new FreeFlyThrottleControlLoop(), new FreeFlyProcessingLoop()],
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
    if (this.mappedUserInput.isEventOfAction(ev, COMMON_GROUP, CHANGE_VIEW_ACTION)) {
      this.viewIndex = 1 - this.viewIndex;

      this.setState(this.createState());
    }
  }

  override render() {
    return (
      <div onKeyDown={this.onKeyPress.bind(this) as any}>
        <GameViewWidget ref={(x) => x?.focus()} gameView={this.state.freeFlightGameView} />
      </div>
    );
  }
}
