import type { Store } from 'redux'
import * as React from 'react'
import { useContext } from 'react'
import useSubscription from '../react/use-subscription'
import type { Dispatch } from './types'

const Context = React.createContext<Store | undefined>(undefined)

function useStore<T>(): Store<T> {
    const store = useContext(Context)

    if (store === undefined)
        throw new Error('store is not provided')

    return store
}

const strictEqual = <T>(one: T, two: T) => one === two

function useSelector<S, T>(selector: (state: S) => T, equal: (one: T, two: T) => boolean = strictEqual): T {
    const store = useStore<S>()
        , state = useSubscription(store.subscribe, store.getState, equal, selector)

    return state
}

function useDispatch(): Dispatch {
    const store = useStore<any>()
    return store.dispatch
}

export default Context
export { useSelector, useDispatch }
