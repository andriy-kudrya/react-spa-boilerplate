import { Middleware } from 'redux'
import { action, actionHasType, ActionType } from '#/utils/redux'

const REGISTER_MIDDLEWARE: ActionType<Middleware, void> = 'app.utils.REGISTER_MIDDLEWARE'

const registerMiddleware = action(REGISTER_MIDDLEWARE)

const compositeMiddleware: Middleware = api => next => {
    let mwInstance = next

    return action => {
        if (!actionHasType(action, REGISTER_MIDDLEWARE))
            return mwInstance(action)

        const mw = action.payload

        mwInstance = mw(api)(mwInstance)
    }
}

export {
    compositeMiddleware,
    registerMiddleware,
}
