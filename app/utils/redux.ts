import { Action, Reducer } from 'redux'

type ActionType<P = void> = string & { attachPayloadTypeHack?: P }

interface PayloadAction<P> extends Action {
    payload: P
}

type ActionFactory<P> = [P] extends [void]
    ? () => Action
    : (payload: P) => PayloadAction<P>

function action<P>(type: ActionType<P>): ActionFactory<P> {
    return function (payload) {
        return arguments.length ? { type, payload } : { type }
    } as ActionFactory<P>
}

interface Handler<S, P> {
    (state: S, payload: P): S
}

interface ActionHandler<S, P> {
    actionType: string
    handler: Handler<S, P>
}

// TODO: handler, as well as action, might not have payload at all
function handler<S, P>(actionType: string, handler: Handler<S, P>): ActionHandler<S, P> {
    return { actionType, handler }
}

function reducer<S>(defaultState: S, ...payloadHandlers: ActionHandler<S, any>[]): Reducer<S> {
    const handlerMap = new Map<string, Handler<S, any>>()
    payloadHandlers.forEach(_ => handlerMap.set(_.actionType, _.handler))

    return (state = defaultState, action: PayloadAction<any> | Action) => {
        const reduce = handlerMap.get(action.type)

        if (reduce)
            return reduce(state, (<any>action).payload)

        return state
    }
}

const squash = (...objects: any[]) => Object.assign({}, ...objects)

export { action, ActionType, reducer, handler, squash, PayloadAction }
