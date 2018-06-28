import { Middleware, MiddlewareAPI } from '#/entities/redux'
import { ActionType, DispatchResult, Dispatch, isPayloadAction } from '../redux'
import createHash from '../hash'

type Handler<P, R> = (payload: P) => DispatchResult<P, R>

interface EffectHandler<P, R> {
    actionType: ActionType<P, R>
    handler: Handler<P, R>
}

function handler<P, R>(actionType: ActionType<P, R>, handler: Handler<P, R>): EffectHandler<P, R> {
    return { actionType, handler }
}

function effectMiddlewareFactory(effectsFactories: EffectsFactory[]): Middleware {
    const map = createHash<Handler<any, any>>()

    return api => {
        effectsFactories.forEach(
            factory => factory(api.dispatch as any, api.getState).forEach(registerEffect)
        )

        return next => action => {
            const handler = map.get(action.type) as any

            if (!handler)
                return next(action as any)

            return isPayloadAction(action) ? handler(action.payload) : handler()
        }
    }

    function registerEffect(e: EffectHandler<any, any>) {
        map.set(e.actionType, e.handler)
    }
}

interface EffectsFactory {
    (dispatch: Dispatch, getState: MiddlewareAPI['getState']): EffectHandler<any, any>[]
}

export { effectMiddlewareFactory as default, handler, EffectsFactory }
