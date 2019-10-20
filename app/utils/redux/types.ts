interface Default {
    ['!@#$']: '!@#$'
}

/**
 * @param P Payload type
 * @param R Result type of "dispatch" function when action of this type is dispatched.
 * By default it should be action itself but I see no way to declare such recursive type:
 * ActionType<P, R =
 *    ActionType<P, R =
 *        ...
 *    >
 * >
 * So 'Default' terminator is used
 */
type ActionType<P, R = Default> = string & {
    attachPayloadTypeHack?: P
    attachDispatchResultTypeHack?: R
}

type VoidAction<R> = { type: ActionType<void, R> }
type NonVoidAction<P, R> = { type: ActionType<P, R>, payload: P }
type Action<P, R> = P extends void ? VoidAction<R> : NonVoidAction<P, R>

type DispatchResult<P, R> = R extends Default ? Action<P, Default> : R

// Type inference does not work with conditional types
// so overloaded dispatch is used instead of single parameter Action<P, R>
// https://github.com/Microsoft/TypeScript/issues/25301
interface Dispatch {
    <R>(action: VoidAction<R>): DispatchResult<void, R>
    <P, R>(action: NonVoidAction<P, R>): DispatchResult<P, R>
}

interface MiddlewareAPI<S> {
    dispatch: Dispatch
    getState(): S
}

interface Middleware<S> {
    (api: MiddlewareAPI<S>): (next: Dispatch) => (action: any) => any
    // (api: MiddlewareAPI<S>): (next: Dispatch) => <P, R>(action: Action<P, R>) => DispatchResult<P, R>
    // (api: MiddlewareAPI<S>): (next: Dispatch) => Dispatch
}

// https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-322267089
// Used only in redux utils as of now
// Otherwise should be moved to common module
type NoInfer<T> = T & {[K in keyof T]: T[K]}

export {
    ActionType,
    Action,
    VoidAction,
    NonVoidAction,
    Dispatch,
    DispatchResult,
    Default,
    MiddlewareAPI,
    Middleware,
    NoInfer,
}
