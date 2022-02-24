export function filterNull<T>(arr: (T | undefined)[]): T[] {
  return arr.filter((x) => x != undefined) as any;
}
