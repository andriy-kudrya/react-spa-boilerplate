import { Middleware, MiddlewareAPI } from '#/entities/redux'
import { ActionType, isPayloadAction } from '../redux'

type Handler<P, R> = (payload: P) => R

interface EffectHandler<P, R> {
    actionType: ActionType<P>
    handler: Handler<P, R>
}

function handler<P, R>(actionType: ActionType<P>, handler: Handler<P, R>): EffectHandler<P, R> {
    return { actionType, handler }
}

function effectMiddlewareFactory(effectsFactories: EffectsFactory[]): Middleware<any> {
    const map = new Map<ActionType<any>, Handler<any, any>>()

    return api => {
        effectsFactories.forEach(
            factory => factory(api.dispatch, api.getState).forEach(registerEffect)
        )

        return next => action => {
            const handler = map.get(action.type) as any

            if (!handler)
                return next(action)

            return isPayloadAction(action) ? handler(action.payload) : handler()
        }
    }

    function registerEffect(e: EffectHandler<any, any>) {
        map.set(e.actionType, e.handler)
    }
}

interface EffectsFactory {
    (dispatch: MiddlewareAPI['dispatch'], getState: MiddlewareAPI['getState']): EffectHandler<any, any>[]
}

export { effectMiddlewareFactory as default, handler, EffectsFactory }
