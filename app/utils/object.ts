/**
 * Overwrites and adds fields to Target from Augmentation
 * and removes specific fields from Drop
 */
type Redefine<Target extends {}, Augmentation extends {}, Drop extends keyof Target = never> =
    Augmentation & Pick<Target, Exclude<keyof Target, keyof Augmentation | Drop>>

type DropFields<T extends {}, K extends string | number | symbol> = Pick<T, Exclude<keyof T, K>>

function dropFields<T extends {}, F extends keyof T>(target: T, ...fields: F[]): DropFields<T, F> {
    const result = Object.assign({}, target)
    fields.forEach(_ => delete result[_])
    return result
}

function shallowUpdate<T extends U, U extends {}>(object: T, update: U): T {
    return Object.assign({}, object, update)
}

export { shallowUpdate, dropFields, Redefine }
