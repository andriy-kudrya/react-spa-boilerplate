import * as redux from 'redux'
import { assert } from 'chai'
import AppState from '#/entities/app-state'
import { rootReducer } from '#/bootstrap/root'
import { ActionType } from '#/utils/redux/types'
import { action } from '#/utils/redux/action'
import { noop } from '#/utils/function'
import effectsMiddlewareFactory, { EffectsFactory, handler } from '#/utils/redux/effect'
import { delay } from '#/utils/timeout'

import errorMw from './middleware'
// import { ADD_ERROR, REMOVE_ERROR, addError, removeError } from './actions'
import { removeError } from './actions'

describe('error', function () {
    function createStore(...effects: EffectsFactory<AppState>[]) {
        const mw = effectsMiddlewareFactory(effects)
        return redux.createStore(rootReducer, redux.applyMiddleware(errorMw, mw))
    }

    const EFFECT: ActionType<void> = 'EFFECT'
        , EFFECT_TWO: ActionType<void> = 'EFFECT_TWO'
        , EFFECT_ASYNC: ActionType<void, Promise<void>> = 'EFFECT_ASYNC'
        , EFFECT_ASYNC_TWO: ActionType<void, Promise<void>> = 'EFFECT_ASYNC_TWO'

        , effect = action(EFFECT)
        , effectTwo = action(EFFECT_TWO)
        , effectAsync = action(EFFECT_ASYNC)
        , effectAsyncTwo = action(EFFECT_ASYNC_TWO)

    it('should catch synchronous error', function () {
        const effects: EffectsFactory<AppState> = () => [
                handler(EFFECT, _ => { throw new Error('foo') }),
            ]
            , store = createStore(effects)

        assert.doesNotThrow(() => store.dispatch(effect()))
    })

    it('should register synchronous error', function () {
        const effects: EffectsFactory<AppState> = () => [
                handler(EFFECT, _ => { throw new Error('foo') }),
                handler(EFFECT_TWO, _ => { throw new Error('bar') }),
            ]
            , store = createStore(effects)

        // exercise
        store.dispatch(effect())
        store.dispatch(effectTwo())

        assert.deepEqual(
            store.getState().errors,
            [
                { message: 'foo' },
                { message: 'bar' },
            ]
        )
    })

    it('should register asynchronous error', function () {
        const effects: EffectsFactory<AppState> = () => [
                handler(EFFECT_ASYNC, _ => Promise.reject('foo')),
                handler(EFFECT_ASYNC_TWO, _ => Promise.reject('bar')),
            ]
            , store = createStore(effects)

        // exercise
        const ready = Promise.all([
                store.dispatch(effectAsync()),
                store.dispatch(effectAsyncTwo()),
            ])
            .catch(noop)

        return ready.then(_ =>
            assert.deepEqual(
                store.getState().errors,
                [
                    { message: 'foo' },
                    { message: 'bar' },
                ]
            )
        )
    })

    it('should register unhandled error', function () {
        const store = createStore(() => [])

        // suppress karma error handler (otherwise it doesn't runs tests)
        const onError = window.onerror
        window.onerror = noop

        setTimeout(() => {
            try {
                throw new Error('unhandled')
            }
            finally {
                setTimeout(() =>
                    // recover karma error handler
                    window.onerror = onError
                , 0)
            }
        }, 0)

        const result = delay(1).then(_ =>
            assert.deepEqual(
                store.getState().errors,
                [
                    { message: 'unhandled' },
                ]
            )
        )

        return result
    })

    it('should remove error by reference', function () {
        const effects: EffectsFactory<AppState> = () => [
                handler(EFFECT, _ => { throw new Error('foo') }),
                handler(EFFECT_TWO, _ => { throw new Error('bar') }),
            ]
            , store = createStore(effects)

        store.dispatch(effect())
        store.dispatch(effectTwo())
        const error = store.getState().errors[0]

        // exercise
        store.dispatch(removeError(error))

        assert.deepEqual(
            store.getState().errors,
            [
                { message: 'bar' },
            ]
        )
    })
})
