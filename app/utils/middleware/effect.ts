import State from '#/entities/state'
import { ActionType, DispatchResult, Dispatch, Middleware, isPayloadAction } from '../redux'
import createHash from '../hash'

type Handler<P, R> = (payload: P) => DispatchResult<P, R>

interface EffectHandler<P, R> {
    actionType: ActionType<P, R>
    handler: Handler<P, R>
}

function handler<P, R>(actionType: ActionType<P, R>, handler: Handler<P, R>): EffectHandler<P, R> {
    return { actionType, handler }
}

function effectMiddlewareFactory(effectsFactories: EffectsFactory[]): Middleware<State> {
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

interface EffectsFactory {
    (dispatch: Dispatch, getState: () => State): EffectHandler<any, any>[]
}

export { effectMiddlewareFactory as default, handler, EffectsFactory }
