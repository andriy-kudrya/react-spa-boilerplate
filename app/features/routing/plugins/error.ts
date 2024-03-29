import type * as r5 from 'router5'

import type AppState from '_/entities/app-state'
import type { MiddlewareAPI } from '_/utils/redux'
import * as actions from '_/features/error/actions'

function error(_: r5.Router, deps?: r5.Dependencies): r5.Plugin {
    return {
        onTransitionError(_to, _from, err) {
            const store = deps && deps.store as MiddlewareAPI<AppState>
                , message = err.message

            if (store && message)
                store.dispatch(actions.addError({ message }))
        },
    }
}

error.pluginName = 'error'

export default error
