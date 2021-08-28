export class GameModel {
  persistentShared: any = {};
  persistentLocal: any = {};
  transient: any = {};

  reset() {
    this.persistentShared = {};
    this.persistentLocal = {};
    this.transient = {};
  }
}
