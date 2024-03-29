import type * as router5 from 'router5'

import type AppState from '_/entities/app-state'
import type { MiddlewareAPI } from '_/utils/redux'

// May not be so but I foresee store and toState to be most usable arguments
type Middleware = (
        store: MiddlewareAPI<AppState>,
        toState: router5.State,
        fromState: router5.State,
        router: router5.Router
    ) => boolean | Promise<any>

export default Middleware

export function adapter(middleware: Middleware): router5.MiddlewareFactory {
    return (router, dependencies) => (toState, fromState) => {
        const store = dependencies.store as MiddlewareAPI<AppState>

        return middleware(store, toState, fromState, router)
    }
}
