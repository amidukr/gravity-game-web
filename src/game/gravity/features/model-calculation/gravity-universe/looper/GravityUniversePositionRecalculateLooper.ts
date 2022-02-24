import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { ThreeJsGameViewSceneObject } from "../../../../../../common/game/engine/3rd-party/threejs/ThreeJsGameViewScene";
import { GameSceneObjectMetaModel } from "../../../../../../common/game/engine/features/rendering/GameSceneObjectMeta";
import { GameTimeModel } from "../../../../../../common/game/engine/features/time/GameTimeModel";
import { BaseGamePreRenderingLooper } from "../../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../../common/game/engine/GameEvent";
import { GRAVITY_UNIVERSE_OBJECT } from "../GravityUniverse";
import { GravityUniverseModel, GRAVITY_OBJECT_UNIVERSE } from "../model/GravityUniverseModel";
import { GravityUniverseService } from "../service/GravityUniverseService";

export class GravityUniversePositionRecalculateLooper extends BaseGamePreRenderingLooper {
    gravityUniverseModel!: GravityUniverseModel;
    gameTimeModel!: GameTimeModel;
    
    autowire(application: ApplicationContainer): void {
        this.gravityUniverseModel = application.getComponent(GravityUniverseModel)
        this.gameTimeModel = application.getComponent(GameTimeModel)
    }

    execute(event: GameEvent): void {

        const gravityObjectsList = this.gravityUniverseModel.getGravityObjectList()
        
        const currentMillisecondsTime = this.gameTimeModel.object.milliseconds

        gravityObjectsList.forEach(x => {
            const rotateAngle = x.orbitAngularVelocity * currentMillisecondsTime / 1000
            x.lastCalculatedTimeMilliseconds = currentMillisecondsTime

            x.currentPosition.copy(x.initialPosition).applyAxisAngle(x.orbitRotationAxis, rotateAngle)
        })
    }

}