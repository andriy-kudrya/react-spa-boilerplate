import { Dispatch as CustomDispatch, DispatchResult, VoidAction, NonVoidAction } from './types'

import { compose } from 'redux'

declare module 'redux' {
    export function compose<R>(dispatch: CustomDispatch, actionCreator: () => VoidAction<R>): () => DispatchResult<void, R>
    export function compose<P, R>(dispatch: CustomDispatch, actionCreator: (payload: P) => NonVoidAction<P, R>): (payload: P) => DispatchResult<P, R>
}

export { compose }
