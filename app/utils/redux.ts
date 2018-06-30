import { Reducer } from 'redux'
import createHash from './hash'

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
    attachPayloadTypeHack?: P & never
    attachDispatchResultTypeHack?: R & never
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

type ActionCreatorFactory<P, R> = P extends void
    ? () => Action<P, R>
    : (payload: P) => Action<P, R>

function action<P, R>(type: ActionType<P, R>): ActionCreatorFactory<P, R> {
    return function (payload) {
        return arguments.length ? { type, payload } : { type }
    } as ActionCreatorFactory<P, R>
}

// TODO: type inference doesn't work for ActionType<void> when creating reducer with *reducer* factory below
// type Handler<S, P> = P extends void
//     ? (state: S) => S
//     : (state: S, payload: P) => S
type Handler<S, P> = (state: S, payload: P) => S

interface ActionHandler<S, P, R> {
    actionType: ActionType<P, R>
    handler: Handler<S, P>
}

function handler<S, P, R>(actionType: ActionType<P, R>, handler: Handler<S, P>): ActionHandler<S, P, R> {
    return { actionType, handler }
}

function isPayloadAction(action: Action<any, any>): action is { type: ActionType<any, any>, payload: any } {
    return 'payload' in action
}

function reducer<S>(defaultState: S, ...payloadHandlers: ActionHandler<S, any, any>[]): Reducer<S> {
    const handlerMap = createHash<Handler<S, any>>()
    payloadHandlers.forEach(_ => handlerMap.set(_.actionType, _.handler))

    return (state = defaultState, action: Action<any, any> | Action<void, any>) => {
        const handler = handlerMap.get(action.type) as any

        if (handler)
            return isPayloadAction(action) ? handler(state, action.payload) : handler(state)

        return state
    }
}

function actionHasType<P, R>(action: any, type: ActionType<P, R>): action is Action<P, R> {
    return action.type === type
}

export {
    action,
    actionHasType,
    isPayloadAction,
    reducer,
    handler,
    ActionType,
    Action,
    Dispatch,
    DispatchResult,
    Default,
    MiddlewareAPI,
    Middleware,
}
