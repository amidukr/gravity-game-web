import { Object3D } from "three";
import { gameSceneObjectTag } from "../../../../common/game/engine/features/rendering/GameSceneObjectMeta";

export const GRAVITY_CENTER_MASS = gameSceneObjectTag<Object3D>("Tag:GravityCenterMass");
export const GRAVITY_FIELD_TAG = gameSceneObjectTag<Object3D>("Tag:GravityField");

export const STAR_TAG = gameSceneObjectTag<Object3D>("Tag:Star");
export const PLANET_TAG = gameSceneObjectTag<Object3D>("Tag:Planet");
