import { useMemo, useRef, useSyncExternalStore } from 'react'

type Cache<T> = { init: false, value: null } | { init: true, value: T }
function assignCache<T>(cache: Cache<T>, value: T) {
    // note: typescript doesn't check correctnes of field-by-field asignment for union type
    cache.init = true
    cache.value = value
}

/**
 * Tracks changes to subscribed value
 * Something in-between of:
 * - https://github.com/facebook/react/blob/master/packages/use-subscription/src/useSubscription.js
 * - https://github.com/reduxjs/react-redux/blob/2eac86163be2bd5627dab3e33e8b4e0926895442/src/hooks/useSelector.js
 * @param subject
 * @param getCurrentValue
 * @param subscribe
 * @param equal
 */
function useSubscription<T>(
    subscribe: (callback: () => void) => () => void,
    getCurrentValue: () => T,
    equal?: (one: any, two: any) => boolean,
): T
function useSubscription<T, M = T>(
    subscribe: (callback: () => void) => () => void,
    getCurrentValue: () => T,
    equal: ((one: any, two: any) => boolean) | undefined,
    mapState: (value: T) => M
): M
function useSubscription<T, M = T>(
    subscribe: (callback: () => void) => () => void,
    getState: () => T,
    equal: (one: any, two: any) => boolean = Object.is,
    mapState?: (value: T) => M
): M {
    const valueCacheRef = useRef<Cache<M>>()
    valueCacheRef.current ||= { init: false, value: null }
    const valueCache = valueCacheRef.current

    const getSnapshot = useMemo(
        () => {
            const stateCache: Cache<T> = { init: false, value: null }

            return () => {
                const state = getState()
                // typescript 4.6.3 has some bug, so it infers stateCache to have type 'never'
                if (valueCache.init && stateCache.init && Object.is((stateCache as Cache<T>).value, state))
                    return valueCache.value

                const value = mapState ? mapState(state) : state as any as M

                if (valueCache.init && equal(valueCache.value, value)) {
                    assignCache(stateCache, state)
                    return valueCache.value
                }

                assignCache(stateCache, state)
                assignCache(valueCache, value)
                return value
            }
        },
        [getState, mapState, equal, valueCache]
    )

    return useSyncExternalStore(subscribe, getSnapshot)
    // type State = {
    //     currentValue: T | M
    //     getState: typeof getState
    //     mapState: typeof mapState
    //     equal: typeof equal
    // }

    // const forceUpdate = useForceUpdate()
    //     , stateRef = useRef<State>()
    //     , state = stateRef.current
    //     , uncommittedValue = state?.getState === getState && state.mapState === mapState
    //         ? state.currentValue
    //         : getValue(getState, mapState)

    // useEffect(
    //     () => {
    //         stateRef.current = {
    //             currentValue: uncommittedValue,
    //             getState,
    //             mapState,
    //             equal,
    //         }
    //     }
    // )

    // useEffect(
    //     () => {
    //         let disposed = false

    //         function handleChange() {
    //             if (disposed)
    //                 return

    //             const state = stateRef.current!
    //                 , nextValue = getValue(state.getState, state.mapState)

    //             if (state.equal(nextValue, state.currentValue))
    //                 return

    //             state.currentValue = nextValue
    //             forceUpdate()
    //         }

    //         handleChange()

    //         const dispose = subscribe(handleChange)
    //         return () => {
    //             disposed = true
    //             dispose()
    //         }
    //     },
    //     // no need to include 'forceUpdate' dependency but eslint is complaining
    //     [subscribe, forceUpdate]
    // )

    // return uncommittedValue as any
}

export default useSubscription
