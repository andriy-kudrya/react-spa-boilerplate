import { React } from '#/facade/react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Popup from './popup'

describe('popup', function () {
    it('is positioned at exact point', function () {
        const foo = render(<Popup top={10} left={20}/>)

        const popup = foo.getByTestId('popup')

        expect(popup).toHaveStyle('top: 10px; left: 20px;')
    })

    it('is renders children', function () {
        const foo = render(<Popup top={10} left={20}>Test Text</Popup>)

        const popup = foo.getByTestId('popup')

        expect(popup).toContainHTML('Test Text')
    })
})
