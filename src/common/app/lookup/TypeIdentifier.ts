export type Newable<T> = new (...args: any[]) => T;

export interface Abstract<T> {
  prototype: T;
}

export class TypeIdentifierObject<T> {
  constructor(public name: String) {}
}

export type TypeIdentifier<T> = string | Newable<T>;

export function typeIdentifierName<T>(type: TypeIdentifier<T>): string {
  let name;

  if (typeof type === "string") {
    name = type;
  } else if (typeof type === "function") {
    name = type.name;
  }

  if (!name) {
    throw Error(`Can't recognize typeof: ${type}`);
  }

  return name;
}

export function typeIdentifier<T>(
  type: string | Newable<T>
): TypeIdentifier<T> {
  if (typeof type === "function") {
    return type.name;
  }

  if (typeof type === "string") {
    return type;
  }

  throw Error(`Unrecognized typeof ${type}`);
}
