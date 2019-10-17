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

            expect(result).toEqual({ y: 'y' })
        })

        it('must not mutate target', function () {
            const target = { y: 'y' }

            dropFields(target, 'y')

            expect(target).toEqual({ y: 'y' })
        })
    })
})
