import { Introspection, BoundInterface } from "./lookup/Introspection";
import { Promise } from "bluebird";
import { TypeIdentifier, typeIdentifierName } from "./lookup/TypeIdentifier";
import { TYPE_ApplicationComponent } from "./api/ApplicationComponent";

type BoundInterfaceArray = {
  sorted: boolean;
  interfaces: Array<BoundInterface>;
};

export class Application {
  private __components: Array<any> = [];
  private __componentByInterface: { [name: string]: BoundInterfaceArray | undefined } = {};

  constructor() {
    this.registerComponent(this);
  }

  private __lazyGetBoundInterfaceByName(name: string) {
    return (
      this.__componentByInterface[name] ||
      (this.__componentByInterface[name] = {
        sorted: false,
        interfaces: [],
      })
    );
  }

  private __addBoundInterface(boundInterface: BoundInterface) {
    const boundInterfaceArray = this.__lazyGetBoundInterfaceByName(boundInterface.name);

    boundInterfaceArray.sorted = false;
    boundInterfaceArray.interfaces.push(boundInterface);
  }

  registerComponent(component: any) {
    this.__components.push(component);

    this.__addBoundInterface({
      name: component.constructor.name,
      component: component,
      order: 0,
    });

    Introspection.getBoundInterfaces(component).forEach((boundInterface) => this.__addBoundInterface(boundInterface));

    Introspection.resolveInterface(component, TYPE_ApplicationComponent)?.setApplication?.call(component, this);
  }

  async start() {
    await Promise.all(this.getComponentList(TYPE_ApplicationComponent).map((x) => x.register && x.register(this)));

    this.getComponentList(TYPE_ApplicationComponent).forEach((x) => x.autowire && x.autowire(this));

    await Promise.all(this.getComponentList(TYPE_ApplicationComponent).map((x) => x.start && x.start(this)));

    this.getComponentList(TYPE_ApplicationComponent).forEach(
      (x) => x.onApplicationStarted && x.onApplicationStarted(this)
    );
  }

  getComponentList<T>(descriptor: TypeIdentifier<T>): Array<T> {
    const boundInterfaceArray = this.__componentByInterface[typeIdentifierName(descriptor)];

    if (!boundInterfaceArray) return [];

    if (!boundInterfaceArray.sorted) {
      boundInterfaceArray.interfaces.sort((a, b) => a.order - b.order);
      boundInterfaceArray.sorted = true;
    }

    return boundInterfaceArray.interfaces.map((x) => x.component);
  }

  getComponent<T>(descriptor: TypeIdentifier<T>): T {
    const componentList = this.getComponentList(descriptor);

    const length = componentList.length;

    if (length == 0) {
      throw Error(`Can't find component with descriptor: ${descriptor}`);
    }

    return componentList[length - 1];
  }
}
