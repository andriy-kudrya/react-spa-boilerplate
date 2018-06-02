import { Middleware, MiddlewareAPI } from '#/entities/redux'
import { ActionType, isPayloadAction } from '../redux'

type Handler<P, R> = (api: MiddlewareAPI, payload: P) => R

interface EffectHandler<P, R> {
    actionType: ActionType<P>
    handler: Handler<P, R>
}

function handler<P, R>(actionType: ActionType<P>, handler: Handler<P, R>): EffectHandler<P, R> {
    return { actionType, handler }
}

function effectMiddlewareFactory(effects: EffectHandler<any, any>[]) {
    const map = new Map<ActionType<any>, Handler<any, any>>()

    effects.forEach(registerEffect)

    const result: Middleware<any> =
        api => {
            return next => {
                return action => {
                    const handler = map.get(action.type) as any

                    if (!handler)
                        return next(action)

                    return isPayloadAction(action) ? handler(api, action.payload) : handler(api)
                }
            }
        }

    return result

    function registerEffect(e: EffectHandler<any, any>) {
        map.set(e.actionType, e.handler)
    }
}

const emptyEffects: EffectHandler<any, any>[] = []

export { effectMiddlewareFactory as default, handler, emptyEffects }
