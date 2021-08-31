import { ApplicationComponentMeta } from "./lookup/ApplicationComponentMeta";
import { Promise } from "bluebird";
import { Newable, TypeIdentifier } from "./lookup/TypeIdentifier";

export class Application {
  private __components: Array<any> = [];
  private __componentByInterface: { [name: string]: any } = {};
  private __withGlobalFunctionsCache: Array<any> | undefined = [];
  private __globalFunctionsCache: { [name: string]: Array<any> } = {};

  constructor() {
    this.registerComponent(this);
    this.__resetCache();
  }

  private __resetCache() {
    this.__withGlobalFunctionsCache = undefined;
    this.__globalFunctionsCache = {};
  }

  registerComponent(component: any) {
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

  getComponentsWithGlobalFunctions(functionName: string): Array<any> {
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

  invokeGlobalFunctions(functionName: string, ...args: any): any {
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

  getComponentByType(type: Function): any {
    return this.getComponentByInterfaceName(type.name);
  }

  getComponentByInterfaceName(interfaceName: string): any {
    return this.__componentByInterface[interfaceName];
  }

  getComponent<T>(descriptor: TypeIdentifier<T> | Newable<T>): T {
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
