import cn from '_/utils/react/cn'

describe('cn', () => {
    it('returns undefined for empty classes', () => {
        const result = cn()
        expect(result).toBeUndefined()
    })

    it('returns undefined for conditionally empty classes', () => {
        const result = cn(false && 'foo', false && 'bar')
        expect(result).toBeUndefined()
    })

    it('includes conditional classes', () => {
        const result = cn(true && 'foo', true && 'bar')
        expect(result).toBe('foo bar')
    })

    it('handles mixed conditions', () => {
        const result = cn(true && 'foo', false && 'omit', true && 'bar')
        expect(result).toBe('foo bar')
    })
})
