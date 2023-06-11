import { Quaternion, Vector2, Vector3 } from "three";
import { ApplicationContainer } from "../../../../../common/app/ApplicationContainer";
import { quanterionBaseVector } from "../../../../../common/game/engine/3rd-party/threejs/Constants";
import { AxisUserInput } from "../../../../../common/game/engine/features/input/AxisUserInput";
import { MouseDevice } from "../../../../../common/game/engine/features/input/devices/MouseDevice";
import { BaseGameModelProcessingLooper } from "../../../../../common/game/engine/framework/GameLooperTypes";
import { GameEvent } from "../../../../../common/game/engine/GameEvent";
import { UssLocation } from "../../../features/commons/universe-sublocation/model/UssLocation";
import { UniverseSublocationService } from "../../../features/commons/universe-sublocation/UniverseSublocationService";
import { DebugInfoModel } from "../../../features/framework/debug/DebugInfoModel";
import { USSL_UNIVERSE } from "../../../features/model-calculation/gravity-sublocation/GravityUsslContainerHandler";
import { PlayerControlModel } from "../../../features/model-calculation/player-control/PlayerControlModel";
import { PlayerSpaceShip, SpaceShipsModel } from "../../../features/model-calculation/space-ships/SpaceShipsModel";
import { UssObject } from "../../../features/commons/universe-sublocation/model/UssObject";
import { alignQuaternionToVector } from "../../../../../common/utils/ThreeJsUtils";

export class FreeFlyProcessingLoop extends BaseGameModelProcessingLooper {
  axisInput!: AxisUserInput;
  playerViewModel!: PlayerControlModel;
  sublocationService!: UniverseSublocationService;
  spaceShipsModel!: SpaceShipsModel;
  debugModel!: DebugInfoModel;

  maxRotationAngle = (1.5 * Math.PI) / 1000;
  startRotationAt = 0.1;
  rotationSteepnes = 20;
  mouseNavigationEanbledSpeedUpTime = 5 * 1000;

  autowire(application: ApplicationContainer): void {
    this.axisInput = application.getComponent(AxisUserInput);
    this.playerViewModel = application.getComponent(PlayerControlModel);
    this.spaceShipsModel = application.getComponent(SpaceShipsModel);
    this.debugModel = application.getComponent(DebugInfoModel);
    this.sublocationService = application.getComponent(UniverseSublocationService);
  }

  private handleMouseEvent(event: GameEvent) {
    const mousePointerArray = this.axisInput.getCoordinates([MouseDevice.RELATIVE_X, MouseDevice.RELATIVE_Y]);

    const mousePointer = new Vector2().fromArray(mousePointerArray);
    mousePointer.multiplyScalar(2).sub(new Vector2(1, 1));

    const mousePointerOrth = new Vector3(mousePointer.y, -mousePointer.x, 0).normalize();

    var rotateAngle = mousePointer.length();

    if (rotateAngle > this.startRotationAt) {
      rotateAngle = (rotateAngle - this.startRotationAt) / (1 - this.startRotationAt);
      rotateAngle = (Math.pow(this.rotationSteepnes, rotateAngle) - 1) / (this.rotationSteepnes - 1);
      rotateAngle *= this.maxRotationAngle;
      const mouseEnabledNavigationFactor = Math.min(
        1,
        (new Date().getTime() - this.playerViewModel.object.mouseNavigationEanbledAt) / this.mouseNavigationEanbledSpeedUpTime
      );

      rotateAngle *= mouseEnabledNavigationFactor;
    } else {
      rotateAngle = 0;
    }

    const mouseBasedTransformation = new Quaternion().setFromAxisAngle(mousePointerOrth, rotateAngle * event.elapsedTimeMills).normalize();

    this.spaceShipsModel.object.player.orientation.multiply(mouseBasedTransformation).normalize();
  }

  findRootLocation(playerSpaceShip: PlayerSpaceShip): UssLocation {
    var rootLocation: UssLocation | null = playerSpaceShip.ussPosition.location;
    while (rootLocation != null && rootLocation.type != USSL_UNIVERSE) rootLocation = rootLocation.parent;

    if(rootLocation == null) throw Error("rootLocation unexpectedly null")

    return rootLocation
  }

  execute(event: GameEvent) {
    const playerSpaceShip = this.spaceShipsModel.object.player;

    const playerView = this.playerViewModel.object;

    if (playerView.mouseNavigationEanbledAt) {
      this.handleMouseEvent(event);
    }

    const rootLocation = this.findRootLocation(playerSpaceShip)

    const globalVelocity = quanterionBaseVector().applyQuaternion(playerSpaceShip.orientation).normalize().clone();
    globalVelocity.multiplyScalar(playerSpaceShip.throttle)

    const playerGlobalPosition: UssObject = {
        location: rootLocation,
        position: playerSpaceShip.globalCoordinate,
        velocity: globalVelocity
    } 

    const playerLocalPosition = this.sublocationService.transformToLocationCoordinate(playerGlobalPosition, playerSpaceShip.ussPosition.location, rootLocation)
    
    playerSpaceShip.ussPosition.velocity = playerLocalPosition.velocity.clone()
    playerSpaceShip.ussPosition.position.add(
      playerSpaceShip.ussPosition.velocity.clone().multiplyScalar(event.elapsedTimeMills)
    );

    playerSpaceShip.ussPosition = this.sublocationService.normalizeCoordinate(playerSpaceShip.ussPosition);

    const ussGlobal = this.sublocationService.transformToLocationCoordinate(playerSpaceShip.ussPosition, rootLocation, rootLocation);
    playerSpaceShip.globalCoordinate.copy(ussGlobal.position);

    
    var normalized = playerSpaceShip.ussPosition;
    normalized = this.sublocationService.normalizeCoordinate(normalized);
    normalized = this.sublocationService.normalizeCoordinate(normalized);
    normalized = this.sublocationService.normalizeCoordinate(normalized);

    this.debugModel.object.attributes["ussPosition"] = JSON.stringify(playerSpaceShip.ussPosition);
    this.debugModel.object.attributes["ussPositionNormalized"] = normalized;
    this.debugModel.object.attributes["presenceFactor"] = this.sublocationService.calculatePresenceFactor(playerSpaceShip.ussPosition);
    this.debugModel.object.attributes["location"] = playerSpaceShip.ussPosition.location.attributes.gravityObjectName;
  }
}
