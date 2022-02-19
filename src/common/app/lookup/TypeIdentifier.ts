import { PACKAGE_AmidGeFramework } from "../../package";

export class TypeIdentifier<T> {
  static PACKAGE = PACKAGE_AmidGeFramework;

  readonly name: string;

  constructor(readonly shortName: string, readonly packange: TypeIdentifierPackage) {
    this.name = packange.name + "." + shortName;
  }
}

export class TypeIdentifierPackage {
  static PACKAGE = PACKAGE_AmidGeFramework;

  constructor(readonly name: string) {}
}
