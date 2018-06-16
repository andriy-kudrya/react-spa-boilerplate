/**
 * Overwrites and adds fields to Target from Augmentation
 * and removes specific fields from Drop
 */
type Redefine<Target extends object, Augmentation extends object, Drop extends keyof Target = never> =
    Augmentation & Pick<Target, Exclude<keyof Target, keyof Augmentation | Drop>>

type DropFields<T extends object, K extends string | number | symbol> = Pick<T, Exclude<keyof T, K>>

function dropFields<T extends object, F extends keyof T>(target: T, ...fields: F[]): DropFields<T, F> {
    const result = Object.assign({}, target)
    fields.forEach(_ => delete result[_])
    return result
}

function shallowUpdate<T>(object: T, ...update: Partial<T>[]): T {
    return Object.assign({}, object, ...update)
}

export { shallowUpdate, dropFields, Redefine }
