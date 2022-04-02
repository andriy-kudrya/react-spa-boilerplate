import type { Middleware } from 'redux'
import { creatorFactory, actionHasType } from '_/utils/redux'

const creator = creatorFactory('test')
    , registerMiddleware = creator<Middleware, void>('REGISTER_MIDDLEWARE')

const dynamicMiddleware: Middleware = api => next => {
    let mwInstance = next

    return action => {
        if (!actionHasType(action, registerMiddleware))
            return mwInstance(action)

        const mw = action.payload

        mwInstance = mw(api)(mwInstance)
    }
}

export {
    dynamicMiddleware,
    registerMiddleware,
}
