import { ApplicationComponentMeta } from "./lookup/ApplicationComponentMeta";
import { Promise } from "bluebird";

export class Application {
  __components = [];
  __componentByInterface = {};
  __plugins = [];

  constructor() {
    this.registerComponent(this);
    this.__resetCache();
  }

  __resetCache() {
    this.__withGlobalFunctionsCache = undefined;
    this.__globalFunctionsCache = {};
  }

  registerComponent(component) {
    this.__resetCache();

    this.__components.push(component);

    this.__componentByInterface[component.constructor.name] = component;

    ApplicationComponentMeta.getInterfaceNames(component).forEach(
      (name) => (this.__componentByInterface[name] = component)
    );

    ApplicationComponentMeta.invokeGlobalFunction(component, "setApplication", [
      this,
    ]);
  }

  getComponentsWithGlobalFunctions(functionName) {
    if (!this.__withGlobalFunctionsCache) {
      this.__withGlobalFunctionsCache = Object.values(this.__components).filter(
        (component) => ApplicationComponentMeta.getGlobalFunctions(component)
      );
    }

    if (!this.__globalFunctionsCache[functionName]) {
      this.__globalFunctionsCache[functionName] =
        this.__withGlobalFunctionsCache.filter(
          (component) =>
            ApplicationComponentMeta.getGlobalFunctions(component)[functionName]
        );
    }

    return this.__globalFunctionsCache[functionName];
  }

  invokeGlobalFunctions(functionName, ...args) {
    return this.getComponentsWithGlobalFunctions(functionName).map(
      (component) =>
        ApplicationComponentMeta.invokeGlobalFunction(
          component,
          functionName,
          args
        )
    );
  }

  async start() {
    await Promise.all(this.invokeGlobalFunctions("register", this));

    this.invokeGlobalFunctions("autowire", this);

    await Promise.all(this.invokeGlobalFunctions("start", this));

    this.invokeGlobalFunctions("onApplicationStarted", this);
  }

  getComponentByType(type) {
    return this.getComponentByInterfaceName(type.name);
  }

  getComponentByInterfaceName(interfaceName) {
    return this.__componentByInterface[interfaceName];
  }

  getComponent(descriptor) {
    let component;

    if (typeof descriptor === "string") {
      component = this.getComponentByInterfaceName(descriptor);
    } else if (typeof descriptor === "function") {
      component = this.getComponentByType(descriptor);
    } else {
      throw Error(
        "Unrecognized descriptor type: " +
          typeof descriptor +
          " should be string or function"
      );
    }

    if (!component) {
      throw Error("Can't find component for descriptor: " + descriptor);
    }

    return component;
  }
}
