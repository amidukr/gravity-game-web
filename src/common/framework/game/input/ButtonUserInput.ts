/*
    Button is (Keyboard, Mouse button, Gamepad)

*/

import { InputButton } from "./types/InputButton";

export class ButtonUserInput {
  readonly buttonPressed: {
    [buttonId: string]: boolean | undefined;
  } = {};

  buttonDown(button: InputButton) {
    this.buttonPressed[button.buttonId] = true;
  }

  buttonUp(button: InputButton) {
    this.buttonPressed[button.buttonId] = false;
  }

  isButtonPressed(button: InputButton): boolean {
    return this.buttonPressed[button.buttonId] == true;
  }
}
