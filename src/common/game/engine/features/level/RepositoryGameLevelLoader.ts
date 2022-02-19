import { ApplicationContainer } from "../../../../app/ApplicationContainer";
import { resolveTypeIdentifier } from "../../../../app/lookup/TypeIdentifier";
import { BaseGameLevelLoader } from "../../framework/GameLoaderTypes";
import { LoadGameArgumentsModel, LoadGameArgumentsObject } from "../loader/LoadGameArgumentsModel";
import { GameLevel } from "./GameLevel";
import { GameLevelDescriptor, GameLevelRepository, TYPE_GameLevelRepository } from "./GameLevelRepository";

export type LoadGameLevelArgumentsModel = LoadGameArgumentsModel<LoadGameLevelArgumentsObject>;
export const TYPE_LoadGameLevelArgumentsModel = resolveTypeIdentifier<LoadGameLevelArgumentsModel>(LoadGameArgumentsModel);

export interface LoadGameLevelArgumentsObject extends LoadGameArgumentsObject {
  levelDescriptor: GameLevelDescriptor;
}

export class RepositoryGameLevelLoader extends BaseGameLevelLoader {
  gameLevelRepository!: GameLevelRepository;
  gameLevel!: GameLevel;
  loadGameArgumentsModel!: LoadGameLevelArgumentsModel;

  override autowire(application: ApplicationContainer): void {
    this.loadGameArgumentsModel = application.getComponent(TYPE_LoadGameLevelArgumentsModel);
    this.gameLevelRepository = application.getComponent(TYPE_GameLevelRepository);
    this.gameLevel = application.getComponent(GameLevel);
  }

  async startNewGame() {
    const loadGameArgument = this.loadGameArgumentsModel.object;
    this.gameLevel.object = await this.gameLevelRepository.loadLevel(loadGameArgument.levelDescriptor);
  }
}
