export function partial(fn, ...args) {
    return fn.bind(null, ...args);
}