import { Dispatch as CustomDispatch, DispatchResult, NoPayloadAction, PayloadAction } from './types'

import { compose } from 'redux'

declare module 'redux' {
    export function compose<R>(dispatch: CustomDispatch, actionCreator: () => NoPayloadAction<R>): () => DispatchResult<void, R>
    export function compose<P, R>(dispatch: CustomDispatch, actionCreator: (payload: P) => PayloadAction<P, R>): (payload: P) => DispatchResult<P, R>
}

export { compose }
