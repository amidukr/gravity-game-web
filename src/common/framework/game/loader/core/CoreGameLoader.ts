import { Application } from "../../../../app/Application";
import { Introspection } from "../../../../app/lookup/Introspection";
import { GameEngine } from "../../GameEngine";
import { GameModel } from "../../model/GameModel";
import {
  GameLevelDescriptor,
  GameLevelRepository,
  TYPE_GameLevelRepository,
} from "../../level/GameLevelRepository";

import {
  GameEngineConfigurer,
  TYPE_GameEngineConfigurer,
} from "../configurer/GameEngineConfigurer";
import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../../app/api/ApplicationComponent";
import { GameLoader, TYPE_GameLoader } from "./GameLoader";
import { LoadGameObject } from "./LoadGameObject";
import { GameLevel } from "../../level/GameLevel";
import { GameLevelObject } from "../../level/GameLevelObject";

export class CoreGameLoader implements ApplicationComponent {
  private gameLevelRepository!: GameLevelRepository;
  private gameEngine!: GameEngine;
  private gameModel!: GameModel<any>;
  private gameLevel!: GameLevel;
  private gameModelLoader!: GameLoader;
  private gameEngineConfigurerList!: Array<GameEngineConfigurer>;

  constructor() {
    Introspection.bindInterfaceName(this, TYPE_ApplicationComponent);
  }

  autowire(application: Application) {
    this.gameLevelRepository = application.getComponent(
      TYPE_GameLevelRepository
    );
    this.gameEngine = application.getComponent(GameEngine);
    this.gameModel = application.getComponent(GameModel);
    this.gameLevel = application.getComponent(GameLevel);

    this.gameModelLoader = application.getComponent(TYPE_GameLoader);

    this.gameEngineConfigurerList = application.getComponentList(
      TYPE_GameEngineConfigurer
    );
  }

  async loadGame(loadGameObject: LoadGameObject) {
    this.gameLevel.object = await this.gameLevelRepository.loadLevel(
      loadGameObject.levelDescriptor
    );

    this.gameModel.object = { type: "GameModelObject" };

    await this.gameModelLoader.loadGame(loadGameObject);

    this.gameEngineConfigurerList.forEach((x) => x.configure(this.gameEngine));
  }
}
