import { useLayoutEffect, useRef, useCallback } from 'react'
import useForceUpdate from './use-force-update'

const strictEqual = <T>(one: T, two: T) => one === two

function useSubscription<S, T>(
    subject: S,
    getCurrentValue: (subject: S) => T,
    subscribe: (subject: S, callback: () => void) => () => void,
    equal: (one: T, two: T) => boolean = strictEqual
): T {
    // Hook states:
    // - initial call
    // - subsequent call due internal/external condition (e.g. setState call in render or parent component render)
    // - subsequent call due subject update

    const forceUpdate = useForceUpdate()
        , currentValueRef = useRef<T>()
        , getCurrentValueRef = useRef<typeof getCurrentValue>()
        , subscribeRef = useRef<typeof subscribe>()
        , equalRef = useRef<typeof equal>()

    const state = getCurrentValue === getCurrentValueRef.current
            ? currentValueRef.current!
            : getCurrentValue(subject)

    useLayoutEffect(
        () => {
            currentValueRef.current = state
            getCurrentValueRef.current = getCurrentValue
            subscribeRef.current = subscribe
            equalRef.current = equal
        }
    )

    const handleChange = useCallback(
            () => {
                const nextValue = getCurrentValueRef.current!(subject)
                if (equalRef.current!(nextValue, currentValueRef.current!))
                    return

                currentValueRef.current = nextValue
                forceUpdate()
            },
            // no need to include 'update' function because it is dispatch from useReducer, but eslint is complaining
            [subject, forceUpdate]
        )
        , initialUnsubscribe = useRef<(() => void) | boolean>(false)

    if (!initialUnsubscribe.current)
        initialUnsubscribe.current = subscribe(subject, handleChange)

    useLayoutEffect(
        () => {
            const initialSubscription = initialUnsubscribe.current

            if (typeof initialSubscription === 'function') {
                initialUnsubscribe.current = true
                return initialSubscription
            }

            return subscribeRef.current!(subject, handleChange)
        },
        // no need to include 'subject' dependency because handleChange will be updated anyway when subject is changed, but eslint is complaining
        [handleChange, subject]
    )

    return state
}

export default useSubscription
