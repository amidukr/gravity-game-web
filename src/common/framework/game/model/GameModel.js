export class GameModel {
  __persistentShared = {};
  __persistentLocal = {};
  __transient = {};

  getPersistentShared() {
    return this.__persistentShared;
  }

  setPersistentShared(persistentShared) {
    return (this.__persistentShared = persistentShared || {});
  }

  getPersistentLocal() {
    return this.__persistentLocal;
  }

  setPersistentLocal(persistentLocal) {
    return (this.__persistentLocal = persistentLocal || {});
  }

  getTransient() {
    return this.__transient;
  }

  setTransient(transient) {
    return (this.__transient = transient || {});
  }

  reset() {
    this.__persistentShared = {};
    this.__persistentLocal = {};
    this.__transient = {};
  }
}
