import { Object3D, Quaternion, Vector3 } from "three";
import { typeIdentifier } from "../../../common/app/lookup/TypeIdentifier";
import { GameModel } from "../../../common/framework/game/model/GameModel";
import { GameModelObject } from "../../../common/framework/game/model/GameModelObject";

export const TYPE_GravityGameModel = typeIdentifier<GravityGameModel>(GameModel);

export type GravityGameModel = GameModel<GravityGameModelObject>;

export interface SceneComponent{
  object: Object3D
}

export interface SceneComponentCollection {
  [name: string] : SceneComponent  
}

export interface GravityDictionaryModel {
  stars: SceneComponentCollection;
  planets: SceneComponentCollection;
}

export class GravityGameModelObject implements GameModelObject {
  type: "GameModelObject" = "GameModelObject";

  view = {
    quaternion: new Quaternion(),
    mouseNavigationEanbled: false,
  };

  sceneDictionary: GravityDictionaryModel = {
    stars: {},
    planets: {},
  };

  spaceShips = {
    player: {
      position: new Vector3(),
      velocity: new Vector3(),
      throttle: 0.01,
    },
  };
}
