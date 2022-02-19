import { PACKAGE_Global } from "../../package";
import { TypeIdentifier, TypeIdentifierPackage } from "./TypeIdentifier";

export type Newable<T> = new (...args: any[]) => T;
export interface TypeWithPackage {
  name: string;
  PACKAGE: TypeIdentifierPackage;
}

export type NewableWithPackage<T> = Newable<T> & TypeWithPackage;

export type TypeIdentifierAgument<T> = TypeIdentifier<T> | NewableWithPackage<T>;

export function typeIdentifier<T>(name: string, typePackage: TypeIdentifierPackage = PACKAGE_Global): TypeIdentifier<T> {
  return new TypeIdentifier(name, typePackage);
}

export function typeIdentifierPackage(name: string): TypeIdentifierPackage {
  return new TypeIdentifierPackage(name);
}

export function typeIdentifierName<T>(type: TypeIdentifierAgument<T>): string {
  return resolveTypeIdentifier(type).name;
}

export function resolveTypeIdentifier<T>(type: TypeIdentifierAgument<T>): TypeIdentifier<T> {
  if (type?.constructor.name == TypeIdentifier.name) {
    if ((type as any)?.constructor?.PACKAGE?.name == TypeIdentifier.PACKAGE.name) {
      return type as any;
    }
  }

  const constructor = (type as any)?.constructor;

  if (constructor != null) {
    if (constructor.PACKAGE != undefined) {
      return new TypeIdentifier(constructor.name, constructor.PACKAGE);
    } else {
      return new TypeIdentifier(constructor.name, PACKAGE_Global);
    }
  }

  throw Error(`Unrecognized typeof ${type}`);
}
