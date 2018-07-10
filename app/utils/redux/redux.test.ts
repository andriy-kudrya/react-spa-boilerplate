import { assert } from 'chai'
import { shallowUpdate } from '../object'
import { action } from './action'
import { ActionType } from './types'
import { reducer, handler } from './reducer'

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
    })
})
