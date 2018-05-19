export type ValidationResult<T> = {
    [K in keyof T]?: string
}

export function required(name: string) {
    return (value: any) => value
                    ? false
                    : `${name} is required`
}