import React from "react";
import { ApplicationContainer } from "../../../common/app/ApplicationContainer";
import { GameViewWidget } from "../../../common/game/engine/3rd-party/react/GameViewWidget";
import { MappedUserInput } from "../../../common/game/engine/features/input/MappedUserInput";
import { GameView } from "../../../common/game/engine/ui/view/GameView";
import { DebugInfoPanel } from "../debug/DebugInfoPanel";
import { CHANGE_VIEW_ACTION, COMMON_GROUP } from "../input/mappings/GravityGameInputMappings";
import { FreeFlyGameView } from "../views/free/fly/FreeFlyGameView";
import { OrbitGameView } from "../views/free/orbit/OrbitGameView";

export interface RootWidgetProps {
  application: ApplicationContainer;
}

export interface RootWidgetState {
  gameView: GameView;
}

export class RootWidget extends React.Component<RootWidgetProps, RootWidgetState> {
  private viewIndex: number = 0;
  private mappedUserInput: MappedUserInput;

  constructor(props: RootWidgetProps) {
    super(props);

    this.mappedUserInput = props.application.getComponent(MappedUserInput);

    this.state = this.createState();
  }

  createState(): RootWidgetState {
    return {
      gameView: this.createGameView(),
    };
  }

  createGameView(): GameView {
    switch (this.viewIndex) {
      case 0:
        return new FreeFlyGameView(this.props.application);
      default:
        return new OrbitGameView(this.props.application);
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
        <DebugInfoPanel application={this.props.application} />
        <GameViewWidget ref={(x) => x?.focus()} gameView={this.state.gameView} />
      </div>
    );
  }
}
