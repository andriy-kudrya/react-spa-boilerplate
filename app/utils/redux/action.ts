import { ActionType, Action } from './types'

function action<R>(type: ActionType<void, R>): () => Action<void, R>
function action<P, R>(type: ActionType<P, R>): (payload: P) => Action<P, R>
function action<P, R>(type: ActionType<P, R>) {
    return function (payload: P) {
        return arguments.length ? { type, payload } : { type }
    }
}

function isPayloadAction(action: Action<any, any>): action is { type: ActionType<any, any>, payload: any } {
    return 'payload' in action
}

function actionHasType<P, R>(action: any, type: ActionType<P, R>): action is Action<P, R> {
    return action.type === type
}

export { action, isPayloadAction, actionHasType }
