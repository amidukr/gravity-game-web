import React from "react";
import { Application } from "../../../common/app/Application";
import { GameViewWidget } from "../../../common/framework/game/3rd-party/react/GameViewWidget";
import { GameView } from "../../../common/framework/game/ui/view/GameView";
import { FreeFlyRenderingLoop } from "./free/fly/FreeFlyRenderingLoop";
import { FreeFlyProcessingLoop } from "./free/fly/FreeFlyProcessingLoop";
import { OrbitRenderingLoop } from "./free/orbit/OrbitRenderingLoop";
import { MappedUserInput } from "../../../common/framework/game/input/MappedUserInput";
import { InputMappingGroup } from "../../../common/framework/game/input/types/InputMappingGroup";
import { CHANGE_VIEW_ACTION, MainViewInputMappings, MAIN_VIEW_GROUP } from "../input/mappings/GravityGameInputMappings";

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
    if (this.mappedUserInput.isEventOfAction(ev, MAIN_VIEW_GROUP, CHANGE_VIEW_ACTION)) {
      this.viewIndex = 1 - this.viewIndex;

      this.setState(this.createState());
    }
  }

  override render() {
    return (
      <div ref={(x) => x?.focus()} tabIndex={0} onKeyDown={this.onKeyPress.bind(this) as any}>
        <GameViewWidget gameView={this.state.freeFlightGameView} />
      </div>
    );
  }
}
