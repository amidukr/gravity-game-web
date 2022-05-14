type LifecycleArgument = LifecycleStage[] | LifecycleStage;

export class LifecycleStage {
  private nextToRun = new Set<LifecycleStage>();
  private runsAfter = new Set<LifecycleStage>();
  private orderIndex: number | null = null;

  resetIndex() {
    if (this.orderIndex != null) {
      this.orderIndex = null;
      this.nextToRun.forEach((x) => x.resetIndex());
    }
  }

  getOrderIndex() {
    if (this.orderIndex != null) return this.orderIndex;

    var newIndex = 0;

    this.runsAfter.forEach((x) => {
      newIndex = Math.max(newIndex, x.getOrderIndex() + 10);
    });

    this.orderIndex = newIndex;

    return newIndex;
  }

  static root(): LifecycleStage {
    return new LifecycleStage();
  }

  static runAfter(lifecycleArgument: LifecycleArgument): LifecycleStage {
    return new LifecycleStage().runAfter(lifecycleArgument);
  }

  static runBefore(lifecycleArgument: LifecycleArgument): LifecycleStage {
    return new LifecycleStage().runBefore(lifecycleArgument);
  }

  runAfter(lifecycleArgument: LifecycleArgument): this {
    const lifecycleList = Array.isArray(lifecycleArgument) ? lifecycleArgument : [lifecycleArgument];

    lifecycleList.forEach((x) => {
      this.runsAfter.add(x);
      x.nextToRun.add(this);
    });

    this.resetIndex();

    return this;
  }

  runBefore(lifecycleArgument: LifecycleArgument): this {
    const lifecycleList = Array.isArray(lifecycleArgument) ? lifecycleArgument : [lifecycleArgument];

    lifecycleList.forEach((x) => x.runAfter(this));

    return this;
  }
}
