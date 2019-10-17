import * as redux from 'redux'

import { shallowUpdate } from '../object'
import { noop } from '../function'
import { action } from './action'
import { ActionType } from './types'
import { reducer, handler } from './reducer'
import effectsMiddlewareFactory, { EffectsFactory, handler as effectHandler } from './effect'

describe('redux', function () {
    describe('reducer', function () {
        interface State {
            one: number
            two: number
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

            expect(result).toEqual(defaultState)
        })

        it('should preserve current state after unknown action', function () {
            const reduce = reducer(
                    defaultState,
                    handler(ACTION_ONE, (state, payload) => shallowUpdate(state, { one: payload }))
                )
                , currentState = reduce(undefined, actionOne(5))

            const result = reduce(currentState, { type: 'unknown' })

            expect(result).toEqual(currentState)
        })

        it('should delegate action to handler', function () {
            const reduce = reducer(
                    defaultState,
                    handler(ACTION_ONE, (state, payload) => shallowUpdate(state, { one: payload }))
                )

            const result = reduce(undefined, actionOne(5))

            expect(result).toEqual({ one: 5, two: 2 })
        })

        it('should throw when second handler is registered for same action type', function () {
            const createReducer = () =>
                reducer(
                    defaultState,
                    handler(ACTION_ONE, _ => _),
                    handler(ACTION_ONE, _ => _)
                )

            expect(createReducer).toThrow()
        })
    })

    describe('effectsMiddlewareFactory', function () {
        const ACTION_ONE: ActionType<string, void> = 'ACTION_ONE'
            , ACTION_TWO: ActionType<string, void> = 'ACTION_TWO'
            , actionOne = action(ACTION_ONE)

        function createStore<S>(...effects: EffectsFactory<S>[]) {
            const mw = effectsMiddlewareFactory(...effects)
            return redux.createStore(_ => ({}), redux.applyMiddleware(mw))
        }

        it('forbids for same effects factory to have several handlers for same action', function () {
            const effects: EffectsFactory<{}> = () => [
                    effectHandler(ACTION_ONE, noop),
                    effectHandler(ACTION_ONE, noop),
                ]

            expect(() => createStore(effects)).toThrow()
        })

        it('allows for same effects factory to have distinct action handlers', function () {
            const effects: EffectsFactory<{}> = () => [
                    effectHandler(ACTION_ONE, noop),
                    effectHandler(ACTION_TWO, noop),
                ]

            expect(() => createStore(effects)).not.toThrow()
        })

        it('produces side effect when action for registered handler is dispatched', function () {
            let effectTarget = 'initial'
            const effects: EffectsFactory<{}> = () => [
                    effectHandler(ACTION_ONE, _ => { effectTarget = _ }),
                ]
                , store = createStore(effects)

            store.dispatch(actionOne('modified'))

            expect(effectTarget).toBe('modified')
        })

        it('should not produce side effect when action for not registered handler is dispatched', function () {
            let effectTarget = 'initial'
            const effects: EffectsFactory<{}> = () => [
                    effectHandler(ACTION_TWO, _ => { effectTarget = _ }),
                ]
                , store = createStore(effects)

            store.dispatch(actionOne('modified'))

            expect(effectTarget).toBe('initial')
        })
    })
})
