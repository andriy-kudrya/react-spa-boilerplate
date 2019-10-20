type ValidationResult<T> = undefined | {
    [K in keyof T]?:
        T[K] extends any[]
            ? (ValidationResult<T[K][number]> | undefined)[]
            : T[K] extends object
                ? ValidationResult<T[K]>
                : any
}

type FormValue<T> = {
    [K in keyof T]?:
        T[K] extends any[]
            ? Exclude<FormValue<T[K][number]> | null, undefined>[]
            : T[K] extends object
                ? FormValue<T[K]>
                : T[K] | undefined
    }

function required(name: string) {
    return (value: any) => value
                    ? false
                    : `${name} is required`
}

export {
    ValidationResult,
    FormValue,
    required,
}
