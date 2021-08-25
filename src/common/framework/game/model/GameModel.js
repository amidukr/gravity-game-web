export class GameModel {
  persistent = {};
  transient = {};

  getPersistent() {
    return this.persistent;
  }

  setPersistent(persistent) {
    this.persistent = persistent;
  }

  getTransient() {
    return this.transient;
  }

  setTransient(transient) {
    this.transient = transient;
  }
}
