import { Promise } from "bluebird";
import { TYPE_ApplicationComponent } from "./api/ApplicationComponent";
import { BoundInterface, Introspection } from "./lookup/Introspection";
import { TypeIdentifier, typeIdentifierName } from "./lookup/TypeIdentifier";

type BoundInterfaceArray = {
  sorted: boolean;
  interfaces: Array<BoundInterface>;
};

export class ApplicationContainer {
  private __components: Array<any> = [];
  private __componentByInterface: { [name: string]: BoundInterfaceArray | undefined } = {};
  private started = false;
  readonly parentContainer: ApplicationContainer | undefined;

  constructor(params: { parentContainer?: ApplicationContainer } = {}) {
    this.registerComponent(this);
    this.parentContainer = params?.parentContainer;
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
      executionOrder: 0,
    });

    Introspection.getBoundInterfaces(component).forEach((boundInterface) => this.__addBoundInterface(boundInterface));

    Introspection.resolveInterface(component, TYPE_ApplicationComponent)?.setApplication?.call(component, this);
  }

  async start() {
    if (this.started) return;

    await Promise.all(this.getComponentList(TYPE_ApplicationComponent, { searchParent: false }).map((x) => x.register && x.register(this)));

    this.getComponentList(TYPE_ApplicationComponent, { searchParent: false }).forEach((x) => x.autowire && x.autowire(this));

    await Promise.all(this.getComponentList(TYPE_ApplicationComponent, { searchParent: false }).map((x) => x.start && x.start(this)));

    this.getComponentList(TYPE_ApplicationComponent, { searchParent: false }).forEach((x) => x.onApplicationStarted && x.onApplicationStarted(this));

    this.started = true;
  }

  getComponentList<T>(
    descriptor: TypeIdentifier<T>,
    params = {
      searchParent: true,
    }
  ): Array<T> {
    const boundInterfaceArray = this.__componentByInterface[typeIdentifierName(descriptor)];

    if (!boundInterfaceArray) {
      if (this.parentContainer != null && params.searchParent) {
        return this.parentContainer.getComponentList(descriptor);
      } else {
        return [];
      }
    }

    if (!boundInterfaceArray.sorted) {
      boundInterfaceArray.interfaces.sort((a, b) => a.order - b.order);
      boundInterfaceArray.sorted = true;
    }

    return boundInterfaceArray.interfaces.map((x) => x.component);
  }

  getComponent<T>(descriptor: TypeIdentifier<T>): T {
    const componentList = this.getComponentList(descriptor);

    const length = componentList.length;
    executionOrderexecutionOrder;

    if (length == 0) {
      throw Error(`Can't find component with descriptor: ${descriptor}`);
    }

    return componentList[length - 1];
  }
}
