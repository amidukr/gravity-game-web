/*
    Button is (Keyboard, Mouse button, Gamepad)

*/

import { InputButton } from "./types/InputButton";

export class ButtonUserInput {
  readonly buttonPressed: {
    [buttonId: string]: number | undefined;
  } = {};

  buttonDown(button: InputButton) {
    this.buttonPressed[button.buttonId] = new Date().getTime();
  }

  buttonUp(button: InputButton) {
    this.buttonPressed[button.buttonId] = undefined;
  }

  isButtonPressed(button: InputButton): boolean {
    return this.buttonPressed[button.buttonId] != undefined;
  }

  getActionElapsedTime(button: InputButton): number | undefined {
    const buttonPressStartTime = this.buttonPressed[button.buttonId];
    if (buttonPressStartTime != undefined) {
      return new Date().getTime() - buttonPressStartTime;
    } else {
      return undefined;
    }
  }
}
