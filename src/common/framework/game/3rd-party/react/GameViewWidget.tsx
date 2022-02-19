import PropTypes from "prop-types";
import React from "react";
import { AxisUserInput } from "../../input/AxisUserInput";
import { ButtonUserInput } from "../../input/ButtonUserInput";
import { KeyBoardDevice } from "../../input/devices/KeyboardDevice";
import { MouseDevice } from "../../input/devices/MouseDevice";
import { GameRenderer, TYPE_GameRenderer } from "../../rendering/GameRenderer";
import { GameView } from "../../ui/view/GameView";
import { TYPE_GameViewButtonHandler } from "../../ui/view/GameViewButtonHandler";
import { GameViewCollection } from "../../ui/view/GameViewsCollection";

export interface GameViewWidgetProps {
  gameView: GameView;
}

export class GameViewWidget extends React.Component<GameViewWidgetProps, any> {
  private renderer!: GameRenderer;
  private gameView!: GameView;
  private gameViewCollection!: GameViewCollection;
  private canvas?: HTMLCanvasElement;
  private canvasPlaceHolder?: HTMLElement | null;

  constructor(props: GameViewWidgetProps) {
    super(props);
    this.state = { label: "" };

    this.updateGameView(props.gameView);
  }

  updateGameView(newGameView: GameView) {
    if (this.gameView == newGameView) {
      return;
    }

    if (this.gameView) {
      this.gameViewCollection.unbindView(this.gameView);
    }

    this.gameView = newGameView;

    if (newGameView) {
      this.gameViewCollection = this.gameView.container.getComponent(GameViewCollection);

      this.renderer = this.gameView.container.getComponent(TYPE_GameRenderer);

      this.updateMouseCoordinate(1, 1, 2, 2);

      if (this.gameView.exclusiveRenderingCanvas) {
        this.canvas = this.renderer.getCanvasDomElement();
      } else {
        this.canvas = document.createElement("canvas");
      }

      newGameView.canvas = this.canvas;

      this.gameViewCollection.bindView(newGameView);
    } else {
      this.canvas = undefined;
    }
  }

  static propTypes = {
    application: PropTypes.object,
  };

  override componentDidUpdate() {
    this.updateGameView(this.props.gameView);
  }

  override componentDidMount() {
    this.gameViewCollection.bindView(this.gameView);
  }

  override componentWillUnmount() {
    this.gameViewCollection.unbindView(this.gameView);
  }

  setCanvasPlaceholder(canvasPlaceHolder: HTMLElement | null) {
    const canvasDomElement = this.gameView.canvas;

    this.canvasPlaceHolder = canvasPlaceHolder;

    if (canvasPlaceHolder && canvasDomElement) {
      canvasPlaceHolder.appendChild(canvasDomElement);
    }
  }

  focus() {
    this.canvasPlaceHolder?.focus();
  }

  private updateMouseCoordinate(x: number, y: number, width: number, height: number) {
    const axisInput = this.gameView.container.getComponent(AxisUserInput);

    axisInput.setCoordinate(MouseDevice.ABSOLUTE_X, x);
    axisInput.setCoordinate(MouseDevice.ABSOLUTE_Y, y);

    axisInput.setCoordinate(MouseDevice.RELATIVE_X, x / width);
    axisInput.setCoordinate(MouseDevice.RELATIVE_Y, 1 - y / height);
  }

  private handleMouseMove(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    this.updateMouseCoordinate(ev.clientX, ev.clientY, target.clientWidth, target.clientHeight);
  }

  private handleKeyDown(ev: KeyboardEvent) {
    const button = KeyBoardDevice.fromDeviceCode(ev.code);

    this.gameView.container.getComponent(ButtonUserInput).buttonDown(button);
    const buttonHandlers = this.gameView.container.getComponentList(TYPE_GameViewButtonHandler);
    for (const buttonHandler of buttonHandlers) {
      try {
        buttonHandler.keyPressed(button);
      } catch (err) {
        console.error("GameViewWidget", "Exceptiom in buttonHandler listener", buttonHandler, err);
      }
    }
  }

  private handleKeyUp(ev: KeyboardEvent) {
    this.gameView.container.getComponent(ButtonUserInput).buttonUp(KeyBoardDevice.fromDeviceCode(ev.code));
  }

  override render() {
    return (
      <div
        tabIndex={0}
        ref={this.setCanvasPlaceholder.bind(this)}
        style={{ display: "inline" }}
        onMouseMove={(ev) => this.handleMouseMove(ev as any)}
        onKeyDown={(ev) => this.handleKeyDown(ev as any)}
        onKeyUp={(ev) => this.handleKeyUp(ev as any)}
      >
        <div style={{ position: "absolute", color: "white" }}>
          <span>{this.state.label}</span>
        </div>
      </div>
    );
  }
}
