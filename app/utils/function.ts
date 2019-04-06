function noop(): void {}

function id<T>(value: T): T {
    return value
}

type Func<T extends any[], R, C = void> = (this: C, ...args: T) => R

export { Func, noop, id }
