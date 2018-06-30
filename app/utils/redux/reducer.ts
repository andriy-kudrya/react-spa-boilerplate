import { Reducer } from 'redux'

import createHash from '../hash'

import { ActionType, Action } from './types'
import { isPayloadAction } from './action'

// TODO: type inference doesn't work for ActionType<void> when creating reducer with *reducer* factory below
// type Handler<S, P> = P extends void
//     ? (state: S) => S
//     : (state: S, payload: P) => S
type Handler<S, P> = (state: S, payload: P) => S

interface ActionHandler<S, P, R> {
    actionType: ActionType<P, R>
    handler: Handler<S, P>
}

function handler<S, P, R>(actionType: ActionType<P, R>, handler: Handler<S, P>): ActionHandler<S, P, R> {
    return { actionType, handler }
}

function reducer<S>(defaultState: S, ...payloadHandlers: ActionHandler<S, any, any>[]): Reducer<S> {
    const handlerMap = createHash<Handler<S, any>>()
    payloadHandlers.forEach(_ => handlerMap.set(_.actionType, _.handler))

    return (state = defaultState, action: Action<any, any> | Action<void, any>) => {
        const handler = handlerMap.get(action.type) as any

        if (handler)
            return isPayloadAction(action) ? handler(state, action.payload) : handler(state)

        return state
    }
}

export { handler, reducer }
