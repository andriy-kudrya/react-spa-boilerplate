import { React, useState, useLayoutEffect } from '#/facade/react'
import Overlay from './overlay'

interface Props {
    element: HTMLElement | null
    children?: React.ReactNode
}

function Menu(props: Props) {
    const [position, setPosition] = useState<{top: number, left: number}>()
        , element = props.element

    useLayoutEffect(
        () => {
            if (!element) {
                setPosition(undefined)
                return
            }

            const rect = element.getBoundingClientRect()
                , top = rect.bottom
                , left = rect.left

            setPosition({ top, left })
        },
        [element]
    )

    if (!position)
        return null

    return (
        <Overlay {...position}>
            {props.children}
        </Overlay>
    )
}


export default Menu
