export interface LoadGameArgumentsObject {
  type: "LoadGameArgumentsObject";
}

export class LoadGameArgumentsModel<O extends LoadGameArgumentsObject = LoadGameArgumentsObject> {
  public object!: O;
}
