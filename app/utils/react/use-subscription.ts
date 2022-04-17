import { useEffect, useRef } from 'react'
import useForceUpdate from './use-force-update'

const strictEqual = <T>(one: T, two: T) => one === two
    , getValue = <T, M = T>(get: () => T, map?: (value: T) => M): M => map ? map(get()) : get as any

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
    equal?: (one: any, two: any) => boolean,
    mapValue?: (value: T) => M
): M
function useSubscription<T, M = T>(
    subscribe: (callback: () => void) => () => void,
    getCurrentValue: () => T,
    equal: (one: any, two: any) => boolean = strictEqual,
    mapValue?: (value: T) => M
): M {
    type State = {
        currentValue: T | M
        getCurrentValue: typeof getCurrentValue
        mapValue: typeof mapValue
        equal: typeof equal
    }

    const forceUpdate = useForceUpdate()
        , stateRef = useRef<State>()
        , state = stateRef.current
        , uncommittedValue = state?.getCurrentValue === getCurrentValue && state.mapValue === mapValue
            ? state.currentValue
            : getValue(getCurrentValue, mapValue)

    useEffect(
        () => {
            stateRef.current = {
                currentValue: uncommittedValue,
                getCurrentValue,
                mapValue,
                equal,
            }
        }
    )

    useEffect(
        () => {
            let disposed = false

            function handleChange() {
                if (disposed)
                    return

                const state = stateRef.current!
                    , nextValue = getValue(state.getCurrentValue, state.mapValue)

                if (state.equal(nextValue, state.currentValue))
                    return

                state.currentValue = nextValue
                forceUpdate()
            }

            handleChange()

            const dispose = subscribe(handleChange)
            return () => {
                disposed = true
                dispose()
            }
        },
        // no need to include 'forceUpdate' dependency but eslint is complaining
        [subscribe, forceUpdate]
    )

    return uncommittedValue as any
}

export default useSubscription
