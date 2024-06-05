export const debounce = <F extends (...args: any[]) => void>(fn: F, ms: number): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};