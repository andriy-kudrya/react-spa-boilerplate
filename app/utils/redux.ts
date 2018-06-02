import { Reducer } from 'redux'

type ActionType<P = void> = string & { attachPayloadTypeHack?: P }

type Action<P> = P extends void
    ? { type: ActionType<P> }
    : { type: ActionType<P>, payload: P }

type ActionCreatorFactory<P> = P extends void
    ? () => Action<P>
    : (payload: P) => Action<P>

function action<P>(type: ActionType<P>): ActionCreatorFactory<P> {
    return function (payload) {
        return arguments.length ? { type, payload } : { type }
    } as ActionCreatorFactory<P>
}

// TODO: type inference doesn't work for ActionType<void> when creating reducer with *reducer* factory below
// type Handler<S, P> = P extends void
//     ? (state: S) => S
//     : (state: S, payload: P) => S

type Handler<S, P> = (state: S, payload: P) => S

interface ActionHandler<S, P> {
    actionType: ActionType<P>
    handler: Handler<S, P>
}

function handler<S, P>(actionType: ActionType<P>, handler: Handler<S, P>): ActionHandler<S, P> {
    return { actionType, handler }
}

function isPayloadAction(action: Action<any>): action is { type: ActionType<any>, payload: any } {
    return 'payload' in action
}

function reducer<S>(defaultState: S, ...payloadHandlers: ActionHandler<S, any>[]): Reducer<S> {
    const handlerMap = new Map<string, Handler<S, any>>()
    payloadHandlers.forEach(_ => handlerMap.set(_.actionType, _.handler))

    return (state = defaultState, action: Action<any> | Action<void>) => {
        const handler = handlerMap.get(action.type) as any

        if (handler)
            return isPayloadAction(action) ? handler(state, action.payload) : handler(state)

        return state
    }
}

export { action, ActionType, isPayloadAction, reducer, handler, Action }
