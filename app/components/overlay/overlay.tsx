import { React } from '#/facade/react'
import { useLayoutEffect, useState } from '#/facade/hooks'
import { createPortal } from 'react-dom'

interface Props {
    top: number
    left: number
    children?: React.ReactNode
}

function useOverlayRoot() {
    const overlayRootSelector = 'overlay-root'
        , [overlayRoot, setOverlayRoot] = useState(
            () => document.querySelector<HTMLDivElement>(overlayRootSelector) || undefined
        )

    useLayoutEffect(
        () => {
            if (overlayRoot)
                return

            const plane = document.createElement('div')
            plane.setAttribute('class', overlayRootSelector)

            document.body.appendChild(plane)

            setOverlayRoot(plane)
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    )

    return overlayRoot
}

function Overlay(props: Props) {
    const root = useOverlayRoot()
    if (!root)
        return null

    return createPortal(
        <div
            style={{ top: props.top, left: props.left }}
            className='overlay-container'
            data-testid='overlay'
        >
            {props.children}
        </div>,
        root
    )
}

export default Overlay
