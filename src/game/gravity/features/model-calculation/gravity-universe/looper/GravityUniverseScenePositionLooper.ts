import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneObject } from "../../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { GameSceneObjectMetaModel } from "../../../../../../common/game/engine/features/rendering/GameSceneObjectMeta";
import { BaseGamePreRenderingLooper } from "../../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../../common/game/engine/GameEvent";
import { GRAVITY_UNIVERSE_OBJECT } from "../GravityUniverse";
import { GravityUniverseModel, GRAVITY_OBJECT_UNIVERSE } from "../model/GravityUniverseModel";
import { GravityUniverseService } from "../service/GravityUniverseService";

export class GravityUniversePositionLooper extends BaseGamePreRenderingLooper {
    scenObjectMetaModel!: GameSceneObjectMetaModel;
    gravityUniverseService!: GravityUniverseService;
    gravityUniverseModel!: GravityUniverseModel;
    
    autowire(application: ApplicationContainer): void {
        this.scenObjectMetaModel = application.getComponent(GameSceneObjectMetaModel)    
        this.gravityUniverseService = application.getComponent(GravityUniverseService)
        this.gravityUniverseModel = application.getComponent(GravityUniverseModel)
    }

    execute(event: GameEvent): void {
        const gravityUniverseObjects = this.scenObjectMetaModel.getObjectsByType(GRAVITY_UNIVERSE_OBJECT)

        this.gravityUniverseService.recalculateUniverse()

        gravityUniverseObjects.forEach(x => {

            const gravityObject = this.gravityUniverseModel.getGravityObject(x.name)
            
            x.position.copy(gravityObject.currentPosition)
        })
    }

}