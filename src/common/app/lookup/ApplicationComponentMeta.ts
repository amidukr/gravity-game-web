const PROPERTY_APPLICATION_EXTENSION = "__amid_ukr__application__extension";

type GlobalFunctions = { [functionName: string]: Function };

export class ApplicationComponentMeta {
  static __registerExtension(component: any) {
    return (
      component[PROPERTY_APPLICATION_EXTENSION] ||
      (component[PROPERTY_APPLICATION_EXTENSION] = {})
    );
  }

  static bindInterfaceName(component: any, name: string) {
    const extension = ApplicationComponentMeta.__registerExtension(component);

    const interfacesNames =
      extension.interfacesNames || (extension.interfacesNames = []);

    interfacesNames.push(name);
  }

  static getInterfaceNames(component: any): Array<string> {
    return component[PROPERTY_APPLICATION_EXTENSION]?.interfacesNames || [];
  }

  static getGlobalFunctions(component: any): GlobalFunctions {
    return component[PROPERTY_APPLICATION_EXTENSION]?.globalFunctions;
  }

  static bindToGlobalFunctions(component: any) {
    const extension = ApplicationComponentMeta.__registerExtension(component);

    const globalFunctions =
      extension.globalFunctions || (extension.globalFunctions = {});

    for (const prop of Object.getOwnPropertyNames(component)) {
      if (typeof component[prop] === "function") {
        globalFunctions[prop] = component[prop];
      }
    }

    for (const prop of Object.getOwnPropertyNames(component.__proto__)) {
      if (typeof component[prop] === "function") {
        globalFunctions[prop] = component[prop];
      }
    }
  }

  static registerGlobalFunction(component: any, callback: Function) {
    const extension = ApplicationComponentMeta.__registerExtension(component);

    const globalFunctions =
      extension.globalFunctions || (extension.globalFunctions = {});

    globalFunctions[callback.name] = callback;
  }

  static invokeGlobalFunction(
    component: any,
    functionName: string,
    args: Array<any>
  ) {
    const globalFunctions =
      ApplicationComponentMeta.getGlobalFunctions(component);

    return (
      globalFunctions && globalFunctions[functionName]?.apply(component, args)
    );
  }
}
