import { Application } from "../../../app/Application";
import { ApplicationComponentMeta } from "../../../app/lookup/ApplicationComponentMeta";
import { GameEngine } from "../GameEngine";
import { GameModel } from "../model/GameModel";
import { GameVisualResources } from "../rendering/GameVisualResources";
import {
  GameLevelRepository,
  TYPE_GameLevelRepository,
} from "./api/GameLevelRepository";
import { LevelDescriptor } from "./LevelDescriptor";
import * as THREE from "three";
import {
  GameEngineConfigurer,
  TYPE_GameEngineConfigurer,
} from "./api/GameEngineConfigurer";
import {
  ApplicationComponent,
  TYPE_ApplicationComponent,
} from "../../../app/api/ApplicationComponent";
import {
  GameModelPreprocessor,
  TYPE_GameModelPreprocessor,
} from "./api/GameModelPreprocessor";

export class GameLoader implements ApplicationComponent {
  private gameLevelRepository!: GameLevelRepository;
  private gameVisualResources!: GameVisualResources;
  private gameEngine!: GameEngine;
  private gameModel!: GameModel;
  private gameModelPreprocessorList!: Array<GameModelPreprocessor>;
  private gameEngineConfigurerList!: Array<GameEngineConfigurer>;

  constructor() {
    ApplicationComponentMeta.bindInterfaceName<ApplicationComponent>(
      this,
      TYPE_ApplicationComponent
    );
  }

  autowire(application: Application) {
    this.gameLevelRepository = application.getComponent(
      TYPE_GameLevelRepository
    );
    this.gameVisualResources = application.getComponent(GameVisualResources);
    this.gameEngine = application.getComponent(GameEngine);
    this.gameModel = application.getComponent(GameModel);

    this.gameModelPreprocessorList = application.getComponentList(
      TYPE_GameModelPreprocessor
    );

    this.gameEngineConfigurerList = application.getComponentList(
      TYPE_GameEngineConfigurer
    );
  }

  async loadGame(levelDescriptor: LevelDescriptor) {
    const level = await this.gameLevelRepository.loadLevel(
      levelDescriptor.levelName
    );

    this.gameModel.reset();
    this.gameModel.persistentShared = level.data.persistentShared;
    this.gameModel.persistentLocal = level.data.persistentLocal;
    this.gameModel.transient = level.data.transient;

    this.gameModelPreprocessorList.forEach((x) =>
      x.preprocess(this.gameModel, level)
    );

    this.gameVisualResources.value = { rootScene: level.rootScene };

    this.gameEngineConfigurerList.forEach((x) => x.configure(this.gameEngine));
  }
}
