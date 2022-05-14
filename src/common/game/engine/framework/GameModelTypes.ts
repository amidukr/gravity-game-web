import { BaseGameState } from "../core/GameModel";

export abstract class BaseGameLevel<O> extends BaseGameState<O> {}

export abstract class BaseGameCoreState<O> extends BaseGameState<O> {}

export abstract class BaseGameModel<O> extends BaseGameState<O> {}

export abstract class BaseGameScene<O> extends BaseGameState<O> {}

export abstract class BaseGameView<O> extends BaseGameState<O> {}
