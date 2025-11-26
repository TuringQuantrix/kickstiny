export function getFiber(node) {
  for (const key in node) {
    if (key.startsWith("__reactFiber$")) {
      return node[key];
    }
  }
  return null;
}

export function getRefCurrent(value) {
  if (!value || typeof value !== "object") {
    return null;
  }
  return "current" in value ? value.current : null;
}

export function* scanHooks(fiber) {
  let hook = fiber.memoizedState;
  while (hook) {
    const ref = getRefCurrent(hook.memoizedState);
    if (ref) {
      yield ref;
    }
    hook = hook.next;
  }
}

export function* collectFibers(fiber, max = 300) {
  let cursor = fiber;
  let count = 0;
  while (cursor && count < max) {
    yield cursor;
    cursor = cursor.return;
    count++;
  }
}

export function* searchFiberTree(fiber) {
  for (const item of collectFibers(fiber, 300)) {
    // 0: FunctionComponent, 1: ClassComponent
    if (item.tag === 0 || item.tag === 1) {
      yield* scanHooks(item);
    }
  }
}
