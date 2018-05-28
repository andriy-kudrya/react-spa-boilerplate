function noop(): void {}

function id<T>(value: T): T {
    return value
}

export { noop, id }
