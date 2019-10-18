import { React, useState, useLayoutEffect } from '#/facade/react'
import Popup from './popup'

interface Props {
    element: HTMLElement | null
    children?: React.ReactNode
}

function useMenuRef() {
    const [element, setElement] = useState<HTMLElement | null>(null)
    return [element, setElement] as const
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
        <Popup {...position}>
            {props.children}
        </Popup>
    )
}

export {
    Menu,
    useMenuRef,
}
