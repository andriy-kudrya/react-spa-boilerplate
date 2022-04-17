import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Overlay from '_/components/overlay/overlay'

describe('overlay', function () {
    it('is positioned at exact point', function () {
        const result = render(<Overlay top={10} left={20}/>)

        const overlay = result.getByTestId('overlay')

        expect(overlay).toHaveStyle('top: 10px; left: 20px;')
    })

    it('is renders children', function () {
        const result = render(<Overlay top={10} left={20}>Test Text</Overlay>)

        const overlay = result.getByTestId('overlay')

        expect(overlay).toContainHTML('Test Text')
    })
})
