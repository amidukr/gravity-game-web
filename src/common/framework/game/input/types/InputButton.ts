export interface InputButtonParameters {
  buttonId: string;
  label?: string;
  deviceCode?: string;
}

export class InputButton {
  readonly buttonId: string;
  readonly label: string;
  readonly deviceCode?: string;

  constructor(paramaters: InputButtonParameters) {
    this.buttonId = paramaters.buttonId;
    this.label = paramaters.label || paramaters.buttonId;
    this.deviceCode = paramaters.deviceCode;
  }
}
