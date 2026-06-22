// bun test src/problems/09-deep-equals/test/deep-equals.test.ts

import { detectType } from '@course/utils'

export function deepEquals(
  a: any,
  b: any,
  cache = new Map<any, Set<any>>(),
): boolean {
  // base case
  if (a === b) return true;
  if (cache.has(a) && cache.get(a)!.has(b)) return true;
  const [typeA, typeB] = [detectType(a), detectType(b)]
  if (typeA !== typeB) return false
  if (typeA === 'object' || typeA === 'array') {
    const [aKeys, bKeys] = [new Set(Object.keys(a)), new Set(Object.keys(b))]
    if (aKeys.symmetricDifference(bKeys).size > 0) return false
    if (!cache.has(a)) {
      cache.set(a, new Set())
    }
    cache.get(a)!.add(b)
    for (const key of aKeys) {
      if (!deepEquals(a[key], b[key], cache))
        return false
    }
    return true
  }
  // primitive
  return a === b
}

// --- Examples ---
// Uncomment to test your implementation:

// console.log(deepEquals(1, 1))                          // Expected: true
// console.log(deepEquals('hello', 'hello'))               // Expected: true
// console.log(deepEquals(null, undefined))                // Expected: false
// console.log(deepEquals([1, 2, 3], [1, 2, 3]))          // Expected: true
// console.log(deepEquals({ a: 1, b: 2 }, { b: 2, a: 1 })) // Expected: true
// console.log(deepEquals({ a: 1 }, { a: 2 }))            // Expected: false
//
// const a: any = { value: 1 }; a.self = a
// const b: any = { value: 1 }; b.self = b
// console.log(deepEquals(a, b))                           // Expected: true (circular)
