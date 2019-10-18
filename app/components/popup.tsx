import { React, useLayoutEffect, useState } from '#/facade/react'
import { createPortal } from 'react-dom'

interface Props {
    top: number
    left: number
    children?: React.ReactNode
}

function usePopupPlane() {
    const popupPlaneSelector = 'app-popup-plane'
        , [popupPlane, setPopupPlane] = useState(
            () => document.querySelector<HTMLDivElement>(popupPlaneSelector) || undefined
        )

    useLayoutEffect(
        () => {
            if (popupPlane)
                return

            const plane = document.createElement('div')
            plane.setAttribute('class', popupPlaneSelector)

            document.body.appendChild(plane)

            setPopupPlane(plane)
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    )

    return popupPlane
}

function Popup(props: Props) {
    const plane = usePopupPlane()
    if (!plane)
        return null

    return createPortal(
        <div
            style={{ top: props.top, left: props.left }}
            className='app-popup-container'
            data-testid='popup'
        >
            {props.children}
        </div>,
        plane
    )
}

export default Popup
