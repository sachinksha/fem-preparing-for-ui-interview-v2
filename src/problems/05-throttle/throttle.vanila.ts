// bun test src/problems/05-throttle/test/throttle.test.ts

export function throttle<F extends (...args: any[]) => void>(
  fn: F,
  delay: number,
): (...args: Parameters<F>) => void {
  let lastTime:number = 0;
  return function throttled(this: unknown, ...args: Parameters<F>): void {
    const currentTime:number = Date.now();
    if(currentTime - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = currentTime;
    }
  }
}
// --- Examples ---
// Uncomment to test your implementation:
// const log = throttle((msg: string) => console.log(msg), 300)
// log('a')  // fires immediately → "a"
// log('b')  // ignored (within 300ms)
// log('c')  // ignored (within 300ms)
// setTimeout(() => log('d'), 400)  // fires → "d" (300ms passed)
