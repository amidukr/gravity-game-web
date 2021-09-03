export interface GameVisualResourcesObject {
  type: "GameVisualResourcesObject";
}

export class GameVisualResources<
  O extends GameVisualResourcesObject = GameVisualResourcesObject
> {
  object!: O;
}
