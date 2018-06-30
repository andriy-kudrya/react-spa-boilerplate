import { ActionType, Action } from './types'

type ActionCreatorFactory<P, R> = P extends void
    ? () => Action<P, R>
    : (payload: P) => Action<P, R>

function action<P, R>(type: ActionType<P, R>): ActionCreatorFactory<P, R> {
    return function (payload) {
        return arguments.length ? { type, payload } : { type }
    } as ActionCreatorFactory<P, R>
}

function isPayloadAction(action: Action<any, any>): action is { type: ActionType<any, any>, payload: any } {
    return 'payload' in action
}

function actionHasType<P, R>(action: any, type: ActionType<P, R>): action is Action<P, R> {
    return action.type === type
}

export { action, isPayloadAction, actionHasType }
