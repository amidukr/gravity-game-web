export interface InputActionParameter {
  actionId: string;
  label?: string;
}

export class InputAction {
  readonly actionId: string;
  readonly label: string;

  constructor(parameters: InputActionParameter) {
    this.actionId = parameters.actionId;
    this.label = parameters.label || parameters.actionId;
  }
}
