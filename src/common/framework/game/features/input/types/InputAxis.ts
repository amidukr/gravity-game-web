export interface InputAxisParameters {
  axisId: string;
  label?: string;
  deviceCode?: string;
}

export class InputAxis {
  axisId: string;
  label: string;
  deviceCode?: string;

  constructor(parameters: InputAxisParameters) {
    this.axisId = parameters.axisId;
    this.label = parameters.label || parameters.axisId;
    this.deviceCode = parameters.deviceCode;
  }
}
