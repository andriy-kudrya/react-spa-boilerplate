import { Dispatch, MiddlewareAPI } from '#/entities/redux'
import { ActionType, Action } from '../redux'
import { error } from '#/utils/error'

interface AsyncMiddleware<P> {
    (api: MiddlewareAPI): (next: Dispatch) => (action: Action<P>) => Promise<any>
}

function asyncMiddlewareFactory<P>(mw: AsyncMiddleware<P>) {
    const result: AsyncMiddleware<P> =
        api => {
            const apiMw = mw(api)
            return next => {
                const nextMw = apiMw(next)
                return action => {
                    const promise = nextMw(action)

                    promise.catch(_ => error({
                        message: 'Error occurred'
                    }))

                    return promise
                }
            }
        }

    return result
}

function actionHasType<P>(type: ActionType<P>) {
    return (action: Action<P>) => action.type === type
}

export default asyncMiddlewareFactory
export { actionHasType }
