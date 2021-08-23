const PROPERTY_APPLICATION_GLOBAL_FUNCTIONS =
  "__amid_ukr__application__global_functions_interface";

export class ApplicationGlobalFunctions {
  static getInterface(component) {
    return component[PROPERTY_APPLICATION_GLOBAL_FUNCTIONS];
  }

  static registerInterface(component, functionInterface) {
    Object.assign(
      component[PROPERTY_APPLICATION_GLOBAL_FUNCTIONS],
      functionInterface
    );
  }

  static registerFunction(component, callback) {
    if (!component[PROPERTY_APPLICATION_GLOBAL_FUNCTIONS]) {
      component[PROPERTY_APPLICATION_GLOBAL_FUNCTIONS] = {};
    }

    const extension = {};
    extension[callback.name] = callback;
    Object.assign(component[PROPERTY_APPLICATION_GLOBAL_FUNCTIONS], extension);
  }

  static invoke(component, functionName, args) {
    return ApplicationGlobalFunctions.getInterface(component)[
      functionName
    ].apply(component, args);
  }
}
