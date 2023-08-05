import { Mesh, Object3D } from "three";
import { sceneObjectTag } from "../../../../common/game/engine/features/rendering/SceneTaggingModel";

export const TAG_GravityCenterMass = sceneObjectTag<Object3D>("Tag:GravityCenterMass");
export const TAG_GravityField = sceneObjectTag<Object3D>("Tag:GravityField");

export const TAG_Star = sceneObjectTag<Object3D>("Tag:Star");
export const TAG_Planet = sceneObjectTag<Object3D>("Tag:Planet");

export const TAG_Atmosphere = sceneObjectTag<Mesh>("Atmosphere");
