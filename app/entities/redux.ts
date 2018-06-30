import { Action, Dispatch, DispatchResult } from '#/utils/redux'
import State from './state'

// app specific middleware types

interface MiddlewareAPI {
    dispatch: Dispatch
    getState(): State
}

interface Middleware {
    (api: MiddlewareAPI): (next: Dispatch) => <P, R>(action: Action<P, R>) => DispatchResult<P, R>
}

export { Dispatch, MiddlewareAPI, Middleware }
