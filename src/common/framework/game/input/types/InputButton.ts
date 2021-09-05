export const INPUT_BUTTON_TYPE = "inputButton";

export interface InputButtonParameters {
  buttonId: string;
  label?: string;
  deviceCode?: string;
}

export class InputButton {
  readonly type = INPUT_BUTTON_TYPE;
  readonly buttonId: string;
  readonly label: string;
  readonly deviceCode?: string;

  constructor(paramaters: InputButtonParameters) {
    this.buttonId = paramaters.buttonId;
    this.label = paramaters.label || paramaters.buttonId;
    this.deviceCode = paramaters.deviceCode;
  }
}
