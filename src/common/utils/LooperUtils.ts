import { GameLooper } from "../game/engine/core/GameLooper";

export function mixLoopers(loopers: GameLooper[][]): GameLooper[] {
  const result = loopers.flat();
  sortLoopers(result);

  return result;
}

export function sortLoopers(loopers: GameLooper[]) {
  loopers.sort((a, b) => a.executionOrder() - b.executionOrder());
}
