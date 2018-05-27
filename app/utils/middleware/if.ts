import { Middleware } from '#/entities/redux'
import { ActionType, Action } from '../redux'

interface ActionPredicate<P> {
    (action: Action<P>): boolean
}

function ifMiddlewareFactory<P>(predicate: ActionPredicate<P>, mw: Middleware<P>) {
    const result: Middleware<P> =
        api => {
            const apiMw = mw(api)
            return next => {
                const nextMw = apiMw(next)
                return action => predicate(action) ? nextMw(action) : next(action)
            }
        }

    return result
}

function actionHasType<P>(type: ActionType<P>): ActionPredicate<P> {
    return action => action.type === type
}

export { ifMiddlewareFactory as default, actionHasType }
