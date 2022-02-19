import { InputButton } from "./InputButton";

export interface InputHotkeyParameters {
  button: InputButton;
}

export class InputHotkey {
  readonly hotKeyId: string;
  readonly button: InputButton;

  constructor(parameters: InputHotkeyParameters) {
    this.button = parameters.button;
    this.hotKeyId = parameters.button.buttonId;
  }
}
