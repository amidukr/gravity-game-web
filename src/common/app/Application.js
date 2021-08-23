import { ApplicationGlobalFunctions } from "./lookup/ApplicationGlobalFunctions";
import { Promise } from "bluebird";

export class Application {
  __components = {};
  __plugins = [];

  constructor() {
    this.registerComponent({ component: this });
    this.__resetCache();
  }

  __resetCache() {
    this.__withGlobalFunctionsCache = undefined;
    this.__globalFunctionsCache = {};
  }

  registerComponent(component) {
    this.__resetCache();

    this.__components[component.constructor.name] = component;
  }

  getComponentsWithGlobalFunctions(functionName) {
    if (!this.__withGlobalFunctionsCache) {
      this.__withGlobalFunctionsCache = Object.values(this.__components).filter(
        (component) => ApplicationGlobalFunctions.getInterface(component)
      );
    }

    if (!this.__globalFunctionsCache[functionName]) {
      this.__globalFunctionsCache[functionName] =
        this.__withGlobalFunctionsCache.filter(
          (component) =>
            ApplicationGlobalFunctions.getInterface(component)[functionName]
        );
    }

    return this.__globalFunctionsCache[functionName];
  }

  invokeGlobalFunctions(functionName, ...args) {
    return this.getComponentsWithGlobalFunctions(functionName).map(
      (component) =>
        ApplicationGlobalFunctions.invoke(component, functionName, args)
    );
  }

  async start() {
    await Promise.all(
      this.invokeGlobalFunctions("registerPluginComponents", this)
    );

    this.invokeGlobalFunctions("autowireApplicationComponent", this);

    await Promise.all(
      this.invokeGlobalFunctions("startApplicationComponent", this)
    );

    this.invokeGlobalFunctions("applicationStarted", this);
  }

  getComponentByType(type) {
    return this.__components[type.name];
  }
}
