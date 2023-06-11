import { ApplicationContainer } from "../../../../../../common/app/ApplicationContainer";
import { GameTimeModel } from "../../../../../../common/game/engine/features/time/GameTimeModel";
import { BaseGamePreRenderingLooper } from "../../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../../common/game/engine/GameEvent";
import { GravityUniverseModel } from "../model/GravityUniverseModel";
import { calculateGravityObjectVelocity } from "../utils/GravityUniverseUtils";

export class GravityUniversePositionRecalculateLooper extends BaseGamePreRenderingLooper {
  gravityUniverseModel!: GravityUniverseModel;

  gameTimeModel!: GameTimeModel;

  autowire(application: ApplicationContainer): void {
    this.gravityUniverseModel = application.getComponent(GravityUniverseModel);
    this.gameTimeModel = application.getComponent(GameTimeModel);
  }

  execute(event: GameEvent): void {
    const gravityObjectsList = this.gravityUniverseModel.getGravityObjectList();

    const currentMillisecondsTime = this.gameTimeModel.object.milliseconds;

    gravityObjectsList.forEach((x) => {
      const rotateAngle = (x.orbitAngularVelocity * currentMillisecondsTime) / 1000;
      x.lastCalculatedTimeMilliseconds = currentMillisecondsTime;

      x.currentOrbitalRotateAngle = rotateAngle;
      x.currentPosition.copy(x.initialPosition).applyAxisAngle(x.orbitRotationAxis, rotateAngle);
      x.currentVelocity = calculateGravityObjectVelocity(x);
    });
  }
}
