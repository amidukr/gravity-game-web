import { TypeIdentifier, typeIdentifierName } from "./TypeIdentifier";

const PROPERTY_APPLICATION_EXTENSION = "__amid_ukr__application__extension";

export type BindInterfaceParameters = {
  order?: number;
};

export type BoundInterface = {
  name: string;
  component: any;
  order: number;
};

type ComponentExtension = {
  interfacesNames: Array<BoundInterface>;
};

export class ApplicationComponentMeta {
  private static __registerExtension(component: any): ComponentExtension {
    return (
      component[PROPERTY_APPLICATION_EXTENSION] ||
      (component[PROPERTY_APPLICATION_EXTENSION] = {})
    );
  }

  private static __getExtension(
    component: any
  ): ComponentExtension | undefined {
    return component[PROPERTY_APPLICATION_EXTENSION];
  }

  static bindInterfaceName<T, P extends T>(
    component: P,
    name: TypeIdentifier<T>,
    parameters: BindInterfaceParameters = {}
  ) {
    const extension = ApplicationComponentMeta.__registerExtension(component);

    const interfacesNames =
      extension.interfacesNames || (extension.interfacesNames = []);

    const boundInterface: BoundInterface = {
      name: typeIdentifierName(name),
      component: component,
      order: parameters.order || 0,
    };

    interfacesNames.push(boundInterface);
  }

  static getBoundInterfaces(component: any): Array<BoundInterface> {
    return this.__getExtension(component)?.interfacesNames || [];
  }

  static resolveInterface<T>(
    component: any,
    type: TypeIdentifier<T>
  ): T | undefined {
    return this.getBoundInterfaces(component).find(
      (x) => x.name == typeIdentifierName(type)
    )?.component;
  }
}
