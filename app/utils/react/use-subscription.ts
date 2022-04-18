import { useMemo, useRef, useSyncExternalStore } from 'react'

type Cache<T> = { init: false, value: null } | { init: true, value: T }
function assignCache<T>(cache: Cache<T>, value: T) {
    // Note: typescript doesn't check correctnes of field-by-field asignment for union type
    cache.init = true
    cache.value = value
}

/**
 * Tracks changes to subscribed value
 * Consider as alternative useSyncExternalStoreWithSelector by react
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
            // State caching idea to avoid mapping & equality checking is inspired by
            // https://github.com/facebook/react/blob/6bce035/packages/use-sync-external-store/src/useSyncExternalStoreWithSelector.js
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
}

export default useSubscription
