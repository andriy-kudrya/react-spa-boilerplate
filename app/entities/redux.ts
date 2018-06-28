import { Action } from '#/utils/redux'
import State from './state'

// app specific middleware types

interface Dispatch {
    (action: Action<any>): Action<any> | Promise<any>
}

interface MiddlewareAPI {
    dispatch: Dispatch
    getState(): State
}

interface Middleware {
    (api: MiddlewareAPI): (next: Dispatch) => (action: Action<any>) => ReturnType<Dispatch>
}

export { Dispatch, MiddlewareAPI, Middleware }
