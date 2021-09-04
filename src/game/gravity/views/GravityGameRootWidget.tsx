import React from "react";
import { Application } from "../../../common/app/Application";
import { GameViewWidget } from "../../../common/framework/game/integrations/react/GameViewWidget";
import { GameView } from "../../../common/framework/game/ui/view/GameView";
import { GravityRenderingLoop } from "./free/fly/FreeFlyRenderingLoop";
import { SpaceShipPhysicsLoop } from "./free/fly/FreeFlyProcessingLoop";

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
  constructor(props: RootWidgetProps) {
    super(props);

    this.state = {
      freeFlightGameView: new GameView({
        application: props.application,
        processingLoops: [new SpaceShipPhysicsLoop()],
        renderingLoops: [new GravityRenderingLoop()],
      }),
    };
  }

  override render() {
    return <GameViewWidget gameView={this.state.freeFlightGameView} />;
  }
}
