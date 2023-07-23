import { Mesh, Object3D } from "three";
import { sceneObjectTag } from "../../../../common/game/engine/features/rendering/SceneTaggingModel";

export const GRAVITY_CENTER_MASS = sceneObjectTag<Object3D>("Tag:GravityCenterMass");
export const GRAVITY_FIELD_TAG = sceneObjectTag<Object3D>("Tag:GravityField");

export const STAR_TAG = sceneObjectTag<Object3D>("Tag:Star");
export const PLANET_TAG = sceneObjectTag<Object3D>("Tag:Planet");

export const ATMOSPHERE_TAG = sceneObjectTag<Mesh>("Atmosphere");
