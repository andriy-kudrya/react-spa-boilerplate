import { assert } from 'chai'
import { dropFields } from './object'

describe('object utils', function () {
    describe('dropFields', function () {
        it('should drop only specified fields', function () {
            const result = dropFields(
                {
                    x: 'x',
                    y: 'y',
                    z: 'z',
                },
                'x',
                'z'
            )

            assert.deepEqual(result, { y: 'y' })
        })

        it('must not mutate target', function () {
            const target = { y: 'y' }

            dropFields(target, 'y')

            assert.deepEqual(target, { y: 'y' })
        })
    })
})
