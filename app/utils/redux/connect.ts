import { compose } from 'redux'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { HasActionType } from './types'
import { Func } from '../function'

type ActionCreator<T extends any[] = any[], R = any> = Func<T, HasActionType<any, R>>

type MappedDispatch<F extends ActionCreator> =
    F extends ActionCreator<infer T, infer R> ? Func<T, R> : never

interface ActionCreatorHash {
    [_: string]: ActionCreator
}

type DispatchHash<T extends ActionCreatorHash> = {
    [P in keyof T]: MappedDispatch<T[P]>
}

function dispatchMapper<H extends ActionCreatorHash>(hash: H) {
    return function (dispatch: any): DispatchHash<H> {
        return Object.keys(hash).reduce(
            (acc, prop) => {
                acc[prop] = compose(dispatch, hash[prop])
                return acc
            },
            {} as any
        )
    }
}

function useAction<T extends ActionCreator>(action: T): MappedDispatch<T> {
    const dispatch = useDispatch()
        , composedDispatch = useCallback(compose(dispatch, action), [dispatch, action])

    return composedDispatch as any
}

export {
    dispatchMapper,
    useAction,
}
