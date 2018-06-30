import { ActionType, DispatchResult, Dispatch, Middleware } from './types'
import { isPayloadAction } from './action'

import createHash from '../hash'

type Handler<P, R> = (payload: P) => DispatchResult<P, R>

interface EffectHandler<P, R> {
    actionType: ActionType<P, R>
    handler: Handler<P, R>
}

function handler<P, R>(actionType: ActionType<P, R>, handler: Handler<P, R>): EffectHandler<P, R> {
    return { actionType, handler }
}

function effectMiddlewareFactory<S>(effectsFactories: EffectsFactory<S>[]): Middleware<S> {
    return api => {
        const map = createHash<Handler<any, any>>()

        effectsFactories.forEach(
            factory => factory(api.dispatch, api.getState)
                .forEach(_ => map.set(_.actionType, _.handler))
        )

        return next => action => {
            const handler = map.get(action.type) as any

            if (!handler)
                return next(action)

            return isPayloadAction(action) ? handler(action.payload) : handler()
        }
    }
}

interface EffectsFactory<S> {
    (dispatch: Dispatch, getState: () => S): EffectHandler<any, any>[]
}

export { effectMiddlewareFactory as default, handler, EffectsFactory }
