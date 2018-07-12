import { assert } from 'chai'

import * as redux from 'redux'

import { shallowUpdate } from '../object'
import { action } from './action'
import { ActionType } from './types'
import { reducer, handler } from './reducer'
import effectsMidlewareFactory, { EffectsFactory, handler as effectHandler } from './effect'

describe('redux', function () {
    describe('reducer', function () {
        interface State {
            one: number,
            two: number,
        }

        const ACTION_ONE: ActionType<number> = 'ACTION_ONE'
            , actionOne = action(ACTION_ONE)
            , defaultState: State = {
                one: 1,
                two: 2,
            }

        Object.freeze(defaultState)

        it('should return default state after unknown action when state is not supplied', function () {
            const reduce = reducer(
                    defaultState,
                    handler(ACTION_ONE, (state, payload) => shallowUpdate(state, { one: payload }))
                )

            const result = reduce(undefined, { type: 'unknown' })

            assert.deepEqual(result, defaultState)
        })

        it('should preserve current state after unknown action', function () {
            const reduce = reducer(
                    defaultState,
                    handler(ACTION_ONE, (state, payload) => shallowUpdate(state, { one: payload }))
                )
                , currentState = reduce(undefined, actionOne(5))

            const result = reduce(currentState, { type: 'unknown' })

            assert.deepEqual(result, currentState)
        })

        it('should delegate action to handler', function () {
            const reduce = reducer(
                    defaultState,
                    handler(ACTION_ONE, (state, payload) => shallowUpdate(state, { one: payload }))
                )

            const result = reduce(undefined, actionOne(5))

            assert.deepEqual(result, { one: 5, two: 2 })
        })

        it('should throw when second handler is registered for same action type', function () {
            const createReducer = () =>
                reducer(
                    defaultState,
                    handler(ACTION_ONE, _ => _),
                    handler(ACTION_ONE, _ => _)
                )

            assert.throws(createReducer)
        })
    })

    describe('effectsMidlewareFactory', function () {
        const ACTION_ONE: ActionType<string, void> = 'ACTION_ONE'
            , ACTION_TWO: ActionType<string, void> = 'ACTION_TWO'
            , actionOne = action(ACTION_ONE)

        function createStore<S>(...effects: EffectsFactory<S>[]) {
            const mw = effectsMidlewareFactory(effects)
            return redux.createStore(_ => _, redux.applyMiddleware(mw))
        }

        it('forbids for same effects factory to have several hanelers for same action', function () {
            const effects: EffectsFactory<{}> = () => [
                    effectHandler(ACTION_ONE, _ => {}),
                    effectHandler(ACTION_ONE, _ => {}),
                ]

            assert.throws(() => createStore(effects))
        })

        it('allows for different effects factories to handle same action', function () {
            const effectsOne: EffectsFactory<{}> = () => [
                    effectHandler(ACTION_ONE, _ => {}),
                ]
                , effectsTwo: EffectsFactory<{}> = () => [
                    effectHandler(ACTION_ONE, _ => {}),
                ]

            assert.doesNotThrow(() => createStore(effectsOne, effectsTwo))
        })

        it('allows for same effects factory to have distinct action hanelers', function () {
            const effects: EffectsFactory<{}> = () => [
                    effectHandler(ACTION_ONE, _ => {}),
                    effectHandler(ACTION_TWO, _ => {}),
                ]

            assert.doesNotThrow(() => createStore(effects))
        })

        it('produces side effect when action for registered handler is dispatched', function () {
            let effectTarget = 'initial'
            const effects: EffectsFactory<{}> = () => [
                    effectHandler(ACTION_ONE, _ => { effectTarget = _ }),
                ]
                , store = createStore(effects)

            store.dispatch(actionOne('modified'))

            assert.equal(effectTarget, 'modified')
        })

        it('should not produce side effect when action for not registered handler is dispatched', function () {
            let effectTarget = 'initial'
            const effects: EffectsFactory<{}> = () => [
                    effectHandler(ACTION_TWO, _ => { effectTarget = _ }),
                ]
                , store = createStore(effects)

            store.dispatch(actionOne('modified'))

            assert.equal(effectTarget, 'initial')
        })
    })
})