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

type Action<P, R> = P extends void
    ? { type: ActionType<P, R> }
    : { type: ActionType<P, R>, payload: P }

type DispatchResult<P, R> = R extends Default ? Action<P, Default> : R

// Type inference does not work with conditional types
// so overloaded dispatch is used instead of single parameter Action<P, R>
// https://github.com/Microsoft/TypeScript/issues/25301
type VoidAction<R> = { type: ActionType<void, R> }
type NonVoidAction<P, R> = { type: ActionType<P, R>, payload: P }
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

export {
    ActionType,
    Action,
    Dispatch,
    DispatchResult,
    Default,
    MiddlewareAPI,
    Middleware,
}
