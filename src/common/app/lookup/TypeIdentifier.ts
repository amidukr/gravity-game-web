export type Newable<T> = new (...args: any[]) => T;

export interface Abstract<T> {
  prototype: T;
}

export class TypeIdentifierObject<T> {
  constructor(public name: String) {}
}

export type TypeIdentifier<T> = string | Newable<T>;

export function type<T>(type: string | Newable<T>): TypeIdentifier<T> {
  if (typeof type === "function") {
    return type.name;
  }

  if (typeof type === "string") {
    return type;
  }

  throw Error(`Unrecognized typeof $type`);
}
