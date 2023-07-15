export function filterNotNull<T>(arr: (T | undefined | null)[]): T[] {
  return arr.filter((x) => x != undefined) as any;
}

export function arrayToObjectWithKey<T>(array: T[], key: (x: T) => string): { [prop: string]: T } {
  return array.reduce((m: { [prop: string]: T }, v) => {
    m[key(v)] = v;
    return m;
  }, {});
}

export function traverseNodeTreeUsingKey<T>(nodeList: T[], key: (x: T) => string, parentKey: (x: T) => string | null, callback: (t: T) => void) {
  const map = arrayToObjectWithKey(nodeList, key);

  traverseNodeTree(
    nodeList,
    (x) => {
      const parentKeyValue = parentKey(x);
      if (!parentKeyValue) return null;
      return map[parentKeyValue];
    },
    callback
  );
}

export function traverseNodeTree<T>(nodeList: T[], parent: (t: T) => T | null, callback: (t: T) => void) {
  const processedNodes = new Set<T>();

  nodeList.forEach((node) => {
    const processingStack: T[] = [];

    var currentNode: T | null = node;
    while (currentNode && !processedNodes.has(currentNode)) {
      processingStack.push(currentNode);
      currentNode = parent(currentNode);
    }

    for (var i = processingStack.length - 1; i >= 0; i--) {
      const x = processingStack[i];
      processedNodes.add(x);
      callback(x);
    }
  });
}

export interface ObjectList<T> {
  [key: string]: T[];
}
export function addToObjectLst<T>(objectList: ObjectList<T>, key: string, value: T) {
  var list = objectList[key];

  if (list == undefined) {
    objectList[key] = list = [];
  }

  list.push(value);
}
