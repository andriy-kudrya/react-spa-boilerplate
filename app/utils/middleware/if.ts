import { Middleware, AnyAction } from 'redux'
import State from '#/entities/state'

function ifMiddlewareFactory(predicate: (action: AnyAction) => boolean, mw: Middleware<{}, State>) {
    const result: Middleware<{}, State> = 
        api => {
            const apiMw = mw(api)
            return next => {
                const nextMw = apiMw(next)
                return action => predicate(action) ? nextMw(action) : next(action)
            }
        }

    return result
}

function actionHasType(type: string) {
    return (action: AnyAction) => action.type === type
}

export default ifMiddlewareFactory
export { actionHasType }