import { Store } from 'redux'
import * as React from 'react'
import { useLayoutEffect, useContext, useReducer, useRef, useCallback } from 'react'
import { Dispatch } from './types'

const Context = React.createContext<Store | undefined>(undefined)

function useStore<T>(): Store<T> {
    const store = useContext(Context)

    if (store === undefined)
        throw new Error('store is not provided')

    return store
}

const defaultEqual = <T>(one: T, two: T) => one === two
    , inc = (x: number) => x + 1
    , useForceUpdate = () => useReducer<React.Reducer<number, void>>(inc, 0)[1] as () => void

function useSelector<S, T>(selector: (state: S) => T, equal: (one: T, two: T) => boolean = defaultEqual): T {
    // Hook states:
    // - initial call
    // - subsequent call due external condition
    // - subsequent call due store update

    const store = useStore<S>()
        , update = useForceUpdate()
        , selectorRef = useRef<typeof selector>()
        , stateRef = useRef<T>()
        , equalRef = useRef<typeof equal>()

    const state = selector !== selectorRef.current
            ? selector(store.getState())
            : stateRef.current!

    useLayoutEffect(
        () => {
            selectorRef.current = selector
            stateRef.current = state
            equalRef.current = equal
        }
    )

    const handleChange = useCallback(
            () => {
                const nextState = selectorRef.current!(store.getState())
                if (equalRef.current!(nextState, stateRef.current!))
                    return

                stateRef.current = nextState
                update()
            },
            // no need to include 'update' function because it is dispatch from useReducer, but eslint is complaining
            [store, update]
        )
        , initialUnsubscribe = useRef<(() => void) | boolean>(false)

    if (!initialUnsubscribe.current)
        initialUnsubscribe.current = store.subscribe(handleChange)

    useLayoutEffect(
        () => {
            const initialSubscription = initialUnsubscribe.current

            if (typeof initialSubscription === 'function') {
                initialUnsubscribe.current = true
                return initialSubscription
            }

            return store.subscribe(handleChange)
        },
        // no need to include 'store' dependency because handleChange will be updated anyway when store is changed, but eslint is complaining
        [handleChange, store]
    )

    return state
}

function useDispatch(): Dispatch {
    const store = useStore<any>()
    return store.dispatch
}

export default Context
export { useSelector, useDispatch }
