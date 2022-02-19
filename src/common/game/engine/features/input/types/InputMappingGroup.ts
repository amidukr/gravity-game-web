interface InputMappingGroupParameters {
  groupId: string;
}

export class InputMappingGroup {
  readonly groupId: string;

  constructor(params: InputMappingGroupParameters) {
    this.groupId = params.groupId;
  }
}
