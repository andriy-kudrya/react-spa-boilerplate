import { Middleware } from 'redux'
import { action, actionHasType, ActionType } from '#/utils/redux'

const REGISTER_MIDDLEWARE: ActionType<Middleware, void> = 'app.lazy-loading.REGISTER_MIDDLEWARE'
    , registerMiddleware = action(REGISTER_MIDDLEWARE)

const dynamicMiddleware: Middleware = api => next => {
    let mwInstance = next

    return action => {
        if (!actionHasType(action, REGISTER_MIDDLEWARE))
            return mwInstance(action)

        const mw = action.payload

        mwInstance = mw(api)(mwInstance)
    }
}

export {
    dynamicMiddleware,
    registerMiddleware,
}
