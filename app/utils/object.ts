/**
 * Overwrites and adds fields to Target from Augmentation
 * and removes specific fields from Drop
 */
type Redefine<Target extends {}, Augmentation extends {}, Drop extends keyof Target = never> =
    Augmentation & Pick<Target, Exclude<keyof Target, keyof Augmentation | Drop>>

type DropFields<T extends {}, K extends string> = Pick<T, Exclude<keyof T, K>>

function dropFields<T extends {}, F extends keyof T>(target: T, ...fields: F[]): DropFields<T, F> {
    const result = Object.assign({}, target)
    fields.forEach(_ => delete result[_])
    return result
}

function squash<A, B, C, D, E, F, G>(a?: A, b?: B, c?: C, d?: D, e?: E, f?: F, g?: G): A & B & C & D & E & F & G
function squash(...objects: any[]): any {
    return Object.assign({}, ...objects)
}

export { squash, dropFields, Redefine }
