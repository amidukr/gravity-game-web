import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../common/app/api/ApplicationComponent";
import { Application } from "../../../common/app/Application";
import { Introspection } from "../../../common/app/lookup/Introspection";
import { GameModel } from "../../../common/framework/game/model/GameModel";
import { GravityPersistentLocalModel } from "./entitites/GravityPersistentLocalModel";
import { GravityPersistentSharedModel } from "./entitites/GravityPersistentSharedModel";

export class GravityGameModel implements ApplicationComponent {
  private model!: GameModel;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  start(application: Application) {
    this.model = application.getComponent(GameModel);
  }

  get persistentShared(): GravityPersistentSharedModel {
    return this.model.persistentShared;
  }

  get persistentLocal(): GravityPersistentLocalModel {
    return this.model.persistentLocal;
  }

  set persistentLocal(value: GravityPersistentLocalModel) {
    this.model.persistentLocal = value;
  }
}
