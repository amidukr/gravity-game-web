const PROPERTY_APPLICATION_EXTENSION = "__amid_ukr__application__extension";

export class ApplicationComponentMeta {
  static __registerExtension(component) {
    return (
      component[PROPERTY_APPLICATION_EXTENSION] ||
      (component[PROPERTY_APPLICATION_EXTENSION] = {})
    );
  }

  static bindInterfaceName(component, name) {
    const extension = ApplicationComponentMeta.__registerExtension(component);

    const interfacesNames =
      extension.interfacesNames || (extension.interfacesNames = []);

    interfacesNames.push(name);
  }

  static getInterfaceNames(component) {
    return component[PROPERTY_APPLICATION_EXTENSION]?.interfacesNames || [];
  }

  static getGlobalFunctions(component) {
    return component[PROPERTY_APPLICATION_EXTENSION]?.globalFunctions;
  }

  static bindToGlobalFunctions(component) {
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

  static registerGlobalFunction(component, callback) {
    const extension = ApplicationComponentMeta.__registerExtension(component);

    const globalFunctions =
      extension.globalFunctions || (extension.globalFunctions = {});

    globalFunctions[callback.name] = callback;
  }

  static invokeGlobalFunction(component, functionName, args) {
    const globalFunctions =
      ApplicationComponentMeta.getGlobalFunctions(component);
    return (
      globalFunctions && globalFunctions[functionName]?.apply(component, args)
    );
  }
}
