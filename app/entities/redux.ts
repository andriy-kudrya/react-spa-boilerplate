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

interface Middleware<P> {
    (api: MiddlewareAPI): (next: Dispatch) => (action: Action<P>) => ReturnType<Dispatch>
}

export { Dispatch, MiddlewareAPI, Middleware }
