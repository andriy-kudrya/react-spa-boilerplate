import { ActionType, Action, Default } from './types'

function creatorFactory(typePrefix: string) {
    function getCreator<P extends void, R = Default>(suffix: ActionType<void, R>): (() => Action<void, R>) & { type: ActionType<P, R> }
    function getCreator<P, R = Default>(suffix: ActionType<P, R>): ((payload: P) => Action<P, R>) & { type: ActionType<P, R> }
    function getCreator<P, R>(suffix: ActionType<P, R>) {
        const type = `${typePrefix}.${suffix}`

        function actionCreator(payload: P) {
            return arguments.length ? { type, payload } : { type }
        }

        actionCreator.type = type

        return actionCreator
    }

    return getCreator
}


function isPayloadAction(action: Action<any, any>): action is { type: ActionType<any, any>, payload: any } {
    return 'payload' in action
}

function actionHasType<P, R>(action: any, type: ActionType<P, R>): action is Action<P, R> {
    return action.type === type
}

export { creatorFactory, isPayloadAction, actionHasType }
