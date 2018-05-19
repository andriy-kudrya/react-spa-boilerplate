import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import State from '#/entities/state'
import { error } from '#/utils/error'

interface AsyncMiddleware<_DispatchExt = {}, S = any, D extends Dispatch = Dispatch> {
  (api: MiddlewareAPI<D, S>): (next: Dispatch<AnyAction>) => (action: any) => Promise<any>
}

function asyncMiddlewareFactory(mw: AsyncMiddleware<{}, State>) {
    const result: AsyncMiddleware<{}, State> = 
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

function actionHasType(type: string) {
    return (action: AnyAction) => action.type === type
}

export default asyncMiddlewareFactory
export { actionHasType }